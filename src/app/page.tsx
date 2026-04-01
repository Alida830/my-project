import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, BrainCircuit, ListChecks } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center pt-24 pb-12 px-4 md:px-8">
      <main className="flex flex-col items-center max-w-5xl text-center space-y-10 w-full">
        {/* Hero Section */}
        <div className="bg-white/5 px-5 py-2 rounded-full border border-white/10 inline-flex items-center gap-2 mb-2 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold tracking-wide text-neutral-200">Power your learning with AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
          Master Any Subject with <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Quizz AI</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl">
          Generate custom quizzes in seconds, test your knowledge, and track your progress instantly with our advanced AI engine.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 pt-8">
          <Link href="/quiz/new">
            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-500/25 transition-all hover:scale-105">
              Generate Quiz
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-full border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-200 transition-all hover:scale-105">
              View Dashboard
            </Button>
          </Link>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24 text-left pt-16 border-t border-neutral-800/50">
          <div className="flex flex-col gap-4 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-blue-500/30 transition-all hover:-translate-y-1">
             <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-2">
                <BrainCircuit className="w-7 h-7" />
             </div>
             <h3 className="text-2xl font-bold text-white">AI Generation</h3>
             <p className="text-neutral-400 leading-relaxed">Upload documents or provide topics, and let AI instantly craft the perfect quiz to test your knowledge.</p>
          </div>

          <div className="flex flex-col gap-4 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-indigo-500/30 transition-all hover:-translate-y-1">
             <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-2">
                <ListChecks className="w-7 h-7" />
             </div>
             <h3 className="text-2xl font-bold text-white">Interactive Learning</h3>
             <p className="text-neutral-400 leading-relaxed">Take quizzes in a sleek, distraction-free environment that maximizes your focus and retention.</p>
          </div>

          <div className="flex flex-col gap-4 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-purple-500/30 transition-all hover:-translate-y-1">
             <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2">
                <Sparkles className="w-7 h-7" />
             </div>
             <h3 className="text-2xl font-bold text-white">Instant Feedback</h3>
             <p className="text-neutral-400 leading-relaxed">Get automatic scoring, detailed dashboard insights, and celebratory rewards as you conquer each milestone.</p>
          </div>
        </div>

      </main>
    </div>
  );
}