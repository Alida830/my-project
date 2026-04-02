"use server";


import { db } from "@/db";
import { quizzSubmissions } from "@/db/schema";
import { auth } from "@/auth";
import { InferInsertModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Submission = InferInsertModel<typeof quizzSubmissions>;

export async function saveSubmission(sub: Submission, quizzId: number) {
  const { score } = sub;

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const newSubmission = await db
    .insert(quizzSubmissions)
    .values({
      score,
      quizzId,
      userId,
    })
    .returning({ insertedId: quizzSubmissions.id });

  const submissionId = newSubmission[0].insertedId;

  revalidatePath("/dashboard");
  return submissionId;
}