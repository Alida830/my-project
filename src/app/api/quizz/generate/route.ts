import { NextRequest, NextResponse } from "next/server";
import saveQuizz from "./saveToDb";
import { auth } from "@/auth";
// @ts-ignore: Next.js Webpack bug workaround targeting internal file
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.formData();
    const document = body.get("pdf") as File | null;
    const rawText = body.get("text") as string | null;

    if (!document && !rawText) {
      return NextResponse.json(
        { error: "No PDF file or text provided." },
        { status: 400 }
      );
    }

    let extractedText = "";

    if (rawText && rawText.trim().length > 0) {
      extractedText = rawText;
    } else if (document) {
      const buffer = Buffer.from(await document.arrayBuffer());
      const fileName = document.name.toLowerCase();

      try {
        if (fileName.endsWith('.pdf')) {
          const pdfData = await pdfParse(buffer);
          extractedText = pdfData.text;
        } else if (fileName.endsWith('.docx')) {
          const docxData = await mammoth.extractRawText({ buffer });
          extractedText = docxData.value;
        } else if (fileName.endsWith('.txt')) {
          extractedText = buffer.toString('utf-8');
        } else {
          return NextResponse.json({ error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file." }, { status: 400 });
        }
      } catch (e: any) {
        console.error("Error parsing document:", e);
        return NextResponse.json({ error: "Failed to parse document: " + (e?.message || String(e)) }, { status: 400 });
      }
    }

    if (!extractedText.trim()) {
       return NextResponse.json({ error: "No extractable text found." }, { status: 400 });
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
        if (content.startsWith("```json")) {
           content = content.replace(/^```json/, "").replace(/```$/, "").trim();
        } else if (content.startsWith("```")) {
           content = content.replace(/^```/, "").replace(/```$/, "").trim();
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
        
        
    
