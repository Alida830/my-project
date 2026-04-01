import { quizzes, questions, quizzSubmissions, users } from "@/db/schema";
import { db } from "@/db";
import { count, eq,avg,sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

const getHeatMapData = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return { data: [] };
  }

  const data = await db
    .select({
      date: sql<string>`TO_CHAR(${quizzSubmissions.createdAt}, 'YYYY/MM/DD')`,
      count: count(quizzSubmissions.id),
    })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .where(eq(quizzes.userId, userId))
    .groupBy(sql`TO_CHAR(${quizzSubmissions.createdAt}, 'YYYY/MM/DD')`);

  return { data };
};

export default getHeatMapData;