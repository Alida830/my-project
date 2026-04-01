"use client";

import Bar from "@/components/Bar";
import Image from "next/image";
import { useEffect } from "react";
import { useReward } from "react-rewards";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Props = {
  scorePercentage: number;
  score: number;
  totalQuestions: number;
  quizName?: string;
  quizDescription?: string;
};

const QuizzSubmission = (props: Props) => {
  const { scorePercentage, score, totalQuestions, quizName, quizDescription } = props;

  const { reward } = useReward("rewardId", "confetti");
  const router = useRouter();

  useEffect(() => {
    if (scorePercentage === 100) {
      reward();
    }
  }, [scorePercentage, reward]);

  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/dashboard");
    }, 8000);
    return () => clearTimeout(t);
  }, [router]);

  // ✅ BACK TO DASHBOARD
  const onHandleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col flex-1 bg-neutral-50 min-h-screen">

      {/* ✅ BACK BUTTON */}
      <div className="w-full p-4 bg-white border-b shadow-sm shadow-black/5 flex justify-start">
        <Button variant="ghost" className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100" onClick={onHandleBack}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Button>
      </div>

      <main className="py-12 md:py-20 flex flex-col items-center flex-1 px-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-black/5 border border-neutral-100 max-w-2xl w-full text-center flex flex-col items-center">
          
          {quizName && (
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-neutral-900 tracking-tight">
              {quizName}
            </h1>
          )}
          {quizDescription && (
            <p className="text-lg md:text-xl text-neutral-500 mb-8 max-w-lg leading-relaxed">
              {quizDescription}
            </p>
          )}

          <div className="w-full h-px bg-neutral-100 mb-8"></div>

          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Quiz Complete!</h2>
          <p className="text-neutral-500 mb-6 font-medium">You scored:</p>
          
          <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-10 drop-shadow-sm">
            {scorePercentage}%
          </div>

          {scorePercentage === 100 ? (
            <div className="flex flex-col items-center bg-green-50/50 p-6 rounded-2xl border border-green-100 w-full">
              <p className="text-xl font-bold text-green-700 mb-4">Perfect Score! Congratulations! 🎉</p>
              <div className="flex justify-center relative">
                <Image
                  src="/images/owl-smiling.png"
                  alt="Smiling owl Image"
                  width={300}
                  height={300}
                  className="drop-shadow-lg transition-transform hover:scale-105"
                />
                <span id="rewardId" className="absolute top-1/2 left-1/2" />
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
              <div className="flex flex-col gap-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-semibold text-green-600">Correct</div>
                  <div className="flex-1"><Bar percentage={scorePercentage} color="green" /></div>
                  <div className="w-12 text-left font-bold">{score}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right font-semibold text-red-500">Incorrect</div>
                  <div className="flex-1"><Bar percentage={100 - scorePercentage} color="red" /></div>
                  <div className="w-12 text-left font-bold">{totalQuestions - score}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-10">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all hover:-translate-y-1" onClick={onHandleBack}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizzSubmission;