import { quizzes, questions, quizzSubmissions, users } from "@/db/schema";
import { db } from "@/db";
import { count, eq,avg } from "drizzle-orm";
import { auth } from "@/auth";

const getUserMetrics = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      numQuizzes: 0,
      numQuestions: 0,
      numSubmissions: 0,
      avgScore: 0,
    };
  }

  // ✅ Total quizzes
  const numQuizzesResult = await db
    .select({ value: count() })
    .from(quizzes)
    .where(eq(quizzes.userId, userId));

  const numQuizzes = numQuizzesResult[0]?.value ?? 0;

  // ✅ Total questions (only user's quizzes)
  const numQuestionsResult = await db
    .select({ value: count() })
    .from(questions)
    .innerJoin(quizzes, eq(questions.quizzId, quizzes.id))
    .where(eq(quizzes.userId, userId));

  const numQuestions = numQuestionsResult[0]?.value ?? 0;

  // ✅ Total submissions (only user's quizzes)
  const numSubmissionsResult = await db
    .select({ value: count() })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .where(eq(quizzes.userId, userId));

  const numSubmissions = numSubmissionsResult[0]?.value ?? 0;

  //get the average score
  const avgScoreResult = await db
  .select({value: avg(quizzSubmissions.score) })
  .from(quizzSubmissions)
  .innerJoin(quizzes,eq(quizzSubmissions.quizzId, quizzes.id))
  .where(eq(quizzes.userId,userId));

  const avgScore = Math.round(Number(avgScoreResult[0]?.value ?? 0));
  

  return [
    { label: 'Number of Quizzes',value: numQuizzes},
    { label: 'Number of Questions',value: numQuestions},
    { label: 'Number of Submissions',value:numSubmissions},
    { label:'Average Score',value:avgScore},
  ];
};

export default getUserMetrics;