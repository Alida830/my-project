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

    // 🕒 SIMULATE GENERATION DELAY (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // ✅ MOCK QUIZ (NO AI)
    const mockQuiz = {
      name: document.name.replace(".pdf", "") + " Quiz",
      description: `A comprehensive quiz generated from ${document.name}`,
      userId,
      questions: [
        {
          questionText: "Which of the following describes the main objective of this document?",
          answers: [
            { answerText: "To provide a theoretical overview", isCorrect: true },
            { answerText: "To list technical specifications", isCorrect: false },
            { answerText: "To outline a marketing strategy", isCorrect: false },
          ],
        },
        {
          questionText: "What is the primary benefit mentioned in the introductory section?",
          answers: [
            { answerText: "Increased efficiency and speed", isCorrect: true },
            { answerText: "Reduced cost of production", isCorrect: false },
            { answerText: "Improved user satisfaction", isCorrect: false },
          ],
        },
        {
          questionText: "According to the document, what is the recommended first step?",
          answers: [
            { answerText: "Initialize the environment", isCorrect: true },
            { answerText: "Contact customer support", isCorrect: false },
            { answerText: "Review the safety protocols", isCorrect: false },
          ],
        },
        {
          questionText: "Which component is identified as the core of the system?",
          answers: [
            { answerText: "The Logic Engine", isCorrect: true },
            { answerText: "The Storage Unit", isCorrect: false },
            { answerText: "The User Interface", isCorrect: false },
          ],
        },
        {
          questionText: "What is the expected outcome of following the provided guidelines?",
          answers: [
            { answerText: "A fully functional prototype", isCorrect: true },
            { answerText: "A detailed project report", isCorrect: false },
            { answerText: "A certificate of completion", isCorrect: false },
          ],
        },
      ],
    };

    const { quizzId } = await saveQuizz(mockQuiz);

    return NextResponse.json({ quizzId }, { status: 200 });

  } catch (e: any) {
    console.error("QUIZ GENERATION ERROR:", e);

    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
        
        
    
