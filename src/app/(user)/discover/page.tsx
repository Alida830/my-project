import { db } from "@/db";
import { quizzes, users } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InferSelectModel } from "drizzle-orm";
import QuizzesTable from "../dashboard/quizzesTable";

export type Quizz = InferSelectModel<typeof quizzes>;

const DiscoverPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch all quizzes directly
  const allQuizzes: Quizz[] = await db.query.quizzes.findMany();

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Discover Quizzes</h1>
          <p className="text-muted-foreground text-lg">Browse and take quizzes created by the community.</p>
        </div>
        <Link href="/quiz/new">
          <Button className="rounded-full px-8 py-6 text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-105 group">
            Create New Quiz
          </Button>
        </Link>
      </div>

      <div className="mb-12 bg-zinc-950/40 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-neutral-100 border-b border-border/40 pb-4">All Quizzes</h2>
        <div className="overflow-x-auto">
          <QuizzesTable quizzes={allQuizzes} />
        </div>
      </div>

    </div>
  );
};

export default DiscoverPage;
