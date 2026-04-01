import { NextRequest, NextResponse } from "next/server";
import saveQuizz from "./saveToDb";
import { auth } from "@clerk/nextjs/server";

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

    // Convert PDF file to buffer and extract text
    const buffer = Buffer.from(await document.arrayBuffer());
    let extractedText = "";
    try {
      const pdfParse = (await import("pdf-parse")).default;
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } catch (e: any) {
      console.error("Error parsing PDF:", e);
      return NextResponse.json({ error: "Failed to parse PDF" }, { status: 400 });
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
          Authorization: \`Bearer \${process.env.HF_TOKEN}\`,
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
       throw new Error(\`HF API Error: \${JSON.stringify(result)}\`);
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
        
        
    
