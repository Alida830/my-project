import { NextRequest, NextResponse } from "next/server";
import saveQuizz from "./saveToDb";
import { auth } from "@clerk/nextjs/server";
import { createRequire } from "module";

export const runtime = "nodejs";

const require = createRequire(import.meta.url);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.formData();
    const document = body.get("pdf") as File;

    if (!document) {
      return NextResponse.json(
        { error: "No PDF file uploaded" },
        { status: 400 }
      );
    }

    const fileName = document.name?.toLowerCase() || "";
    const isPdf =
      document.type === "application/pdf" || fileName.endsWith(".pdf");
    const isTxt =
      document.type.startsWith("text/") || fileName.endsWith(".txt");

    let extractedText = "";

    if (isTxt) {
      extractedText = await document.text();
    } else if (isPdf) {
      const buffer = Buffer.from(await document.arrayBuffer());
      try {
        const pdfParse = require("pdf-parse/lib/pdf-parse.js") as (
          dataBuffer: Buffer
        ) => Promise<{ text: string }>;
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } catch (e: any) {
        console.error("Error parsing PDF:", e);
        return NextResponse.json(
          {
            error:
              "Failed to parse PDF. Try a text-based PDF instead of a scanned image PDF.",
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Only PDF and TXT files are supported right now." },
        { status: 400 }
      );
    }

    if (!extractedText.trim()) {
      return NextResponse.json(
        {
          error:
            "No readable text was found in this file. Try a text-based PDF or TXT file.",
        },
        { status: 400 }
      );
    }

    const promptText = `
You are a Quiz generator. Given the following document text, generate a comprehensive quiz.
Generate a maximum of 5 questions.
The quiz MUST strictly follow this JSON format without any markdown wrappers (start exactly with { and end with }):
{
  "name": "Quiz Name",
  "description": "Quiz Description",
  "questions": [
    {
      "questionText": "Question 1",
      "answers": [
        { "answerText": "Answer 1", "isCorrect": true },
        { "answerText": "Answer 2", "isCorrect": false },
        { "answerText": "Answer 3", "isCorrect": false }
      ]
    }
  ]
}

Document Text:
${extractedText.substring(0, 10000)}
`;

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: promptText,
            },
          ],
          model: "Qwen/Qwen3-4B-Instruct-2507:nscale",
        }),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
       console.error("HF API Error:", result);
       throw new Error(`HF API Error: ${JSON.stringify(result)}`);
    }

    let parsedQuiz;
    try {
        let content = result.choices?.[0]?.message?.content?.trim() || "";
        
        // Remove markdown wrappers if any
        if (content.startsWith("\`\`\`json")) {
           content = content.replace(/^\`\`\`json/, "").replace(/\`\`\`$/, "").trim();
        } else if (content.startsWith("\`\`\`")) {
           content = content.replace(/^\`\`\`/, "").replace(/\`\`\`$/, "").trim();
        }
        
        parsedQuiz = JSON.parse(content);
    } catch (e) {
        console.error("Error parsing JSON from HF model:", e);
        console.error("Raw content:", result.choices?.[0]?.message?.content);
        return NextResponse.json({ error: "Failed to generate valid quiz format. Try again." }, { status: 500 });
    }

    parsedQuiz.userId = userId;
    const { quizzId } = await saveQuizz(parsedQuiz);

    return NextResponse.json({ quizzId }, { status: 200 });

  } catch (e: any) {
    console.error("QUIZ GENERATION ERROR:", e);

    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
        
        
    
