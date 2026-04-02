import { db } from "@/db";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuizzesTable, { Quizz } from "./quizzesTable";
import TakenQuizzesTable from "./takenQuizzesTable";
import getUserMetrics from "@/actions/getUserMetrics";
import { getUserSubmissions } from "@/actions/getUserSubmissions";
import getHeatMapData from "@/actions/getHeatMapData";
import MetricCard from "./metricCard";
import Demo from "./heatMap";

type Metric = { label: string; value: string | number };

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
    where: eq(quizzes.userId, userId),
  });

  const userData = await getUserMetrics();
  const metrics: Metric[] = Array.isArray(userData) ? userData : [];
  const heatMapData = await getHeatMapData();

  const userSubmissions = await getUserSubmissions();

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground text-lg">Track your quizzes, activity, and learning progress.</p>
        </div>
        <Link href="/quiz/new">
          <Button className="rounded-full px-8 py-6 text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-105 group">
            Create New Quiz
          </Button>
        </Link>
      </div>

      {metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </div>
      )}

      <div className="mb-12 bg-zinc-950/40 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-neutral-100 border-b border-border/40 pb-4">Quizzes I Created</h2>
        <div className="mb-8 rounded-xl overflow-hidden border border-border/20 bg-background/50">
          <Demo data={heatMapData.data} />
        </div>
        <div className="overflow-x-auto">
          <QuizzesTable quizzes={userQuizzes} />
        </div>
      </div>

      <div className="mb-8 bg-zinc-950/40 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 shadow-sm">
         <h2 className="text-2xl font-bold mb-6 text-neutral-100 border-b border-border/40 pb-4">Quizzes I Took</h2>
         <div className="overflow-x-auto">
           <TakenQuizzesTable submissions={userSubmissions} />
         </div>
      </div>

    </div>
  );
};

export default Page;