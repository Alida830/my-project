"use server";

import { db } from "@/db";
import { quizzes, quizzSubmissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export async function getUserSubmissions() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return [];
  }

  // Fetch all submissions tied to the authenticated user with quiz relation
  const submissions = await db.query.quizzSubmissions.findMany({
    where: eq(quizzSubmissions.userId, userId),
    with: {
      quizz: {
        with: {
          questions: true,
        },
      },
    },
  });

  return submissions.map((sub) => ({
    submissionId: sub.id,
    score: sub.score,
    quizId: sub.quizz?.id ?? null,
    quizName: sub.quizz?.name ?? null,
    quizDescription: sub.quizz?.description ?? null,
    totalQuestions: sub.quizz?.questions?.length || 0,
  }));
}
