import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import QuizzesTable, { Quizz } from "./quizzesTable";
import TakenQuizzesTable from "./takenQuizzesTable";
import getUserMetrics from "@/actions/getUserMetrics";
import { getUserSubmissions } from "@/actions/getUserSubmissions";
import getHeatMapData from "@/actions/getHeatMapData";
import MetricCard from "./metricCard";
import  Demo from "./heatMap";

type Metric = { label: string; value: string | number };

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
    where: eq(quizzes.userId, userId),
  });

  const userData = await getUserMetrics();
  const metrics: Metric[] = Array.isArray(userData) ? userData : [];
  const heatMapData = await getHeatMapData();
  console.log(heatMapData);

  const userSubmissions = await getUserSubmissions();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {metrics.length > 0 ? (
          <>
            {metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
              />
            ))}
          </>
        ) : null}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quizzes I Created</h2>
        <div>
          <Demo data={heatMapData.data} />
        </div>
        <QuizzesTable quizzes={userQuizzes} />
      </div>

      <div className="mb-8">
        <TakenQuizzesTable submissions={userSubmissions} />
      </div>
    </>
  );
};
export default Page;