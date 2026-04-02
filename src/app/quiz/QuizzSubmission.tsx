"use client";

import Bar from "@/components/Bar";
import Image from "next/image";
import { useEffect } from "react";
import { useReward } from "react-rewards";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trophy, Star, Target, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

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

  // ✅ BACK TO DASHBOARD
  const onHandleBack = () => {
    router.push("/dashboard");
  };

  const getFeedback = (percentage: number) => {
    if (percentage === 100) return { title: "Flawless Victory!", color: "from-green-400 to-emerald-600", border: "border-green-500/30" };
    if (percentage >= 80) return { title: "Excellent Work!", color: "from-blue-400 to-indigo-600", border: "border-blue-500/30" };
    if (percentage >= 50) return { title: "Good Effort! Keep Practicing", color: "from-yellow-400 to-orange-500", border: "border-yellow-500/30" };
    return { title: "Don't Give Up! Review and Try Again", color: "from-red-400 to-rose-600", border: "border-red-500/30" };
  };

  const feedback = getFeedback(scorePercentage);

  return (
    <div className="flex flex-col flex-1 bg-background min-h-screen text-foreground relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

      {/* ✅ BACK BUTTON */}
      <div className="w-full p-4 border-b border-white/5 flex justify-start relative z-10 bg-black/20 backdrop-blur-md">
        <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-white/5 transition-all" onClick={onHandleBack}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Button>
      </div>

      <main className="py-12 md:py-20 flex flex-col items-center flex-1 px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`bg-zinc-950/60 p-8 md:p-12 rounded-[2rem] shadow-2xl border ${feedback.border} backdrop-blur-xl max-w-3xl w-full text-center flex flex-col items-center relative overflow-hidden`}
        >
          
          <div className="space-y-4 mb-8">
            {quizName && (
              <motion.h1 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg"
              >
                {quizName}
              </motion.h1>
            )}
            {quizDescription && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto leading-relaxed"
              >
                {quizDescription}
              </motion.p>
            )}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-10 opacity-50"></div>

          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
            className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-4 ${feedback.border} flex items-center justify-center bg-black/40 shadow-2xl relative mb-8`}
          >
            <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${feedback.color} opacity-20 blur-xl`} />
            <div className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-tr ${feedback.color} drop-shadow-md`}>
              {scorePercentage}%
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-white mb-10"
          >
            {feedback.title}
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-12"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Trophy className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-3xl font-bold text-white">{score}</span>
              <span className="text-neutral-400 font-medium">Correct Answers</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Target className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-3xl font-bold text-white">{totalQuestions}</span>
              <span className="text-neutral-400 font-medium">Total Questions</span>
            </div>
          </motion.div>

          <div className="relative w-full flex justify-center mt-4">
            <span id="rewardId" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <Button 
              size="lg" 
              className="rounded-full px-10 py-6 text-lg font-bold bg-white text-black hover:bg-neutral-200 shadow-xl hover:scale-105 transition-transform" 
              onClick={onHandleBack}
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Return to Dashboard
            </Button>
          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default QuizzSubmission;