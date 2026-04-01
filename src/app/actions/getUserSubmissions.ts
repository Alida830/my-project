"use server";

import { db } from "@/db";
import { quizzes, quizzSubmissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getUserSubmissions() {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  // Fetch all submissions tied to the authenticated user, joined with the quizzes
  const submissions = await db
    .select({
      submissionId: quizzSubmissions.id,
      score: quizzSubmissions.score,
      quizId: quizzes.id,
      quizName: quizzes.name,
      quizDescription: quizzes.description,
    })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .where(eq(quizzSubmissions.userId, userId));

  return submissions;
}
