import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, BrainCircuit, ListChecks } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <main className="flex flex-col items-center max-w-5xl text-center space-y-10 w-full relative z-10">
        {/* Hero Section */}
        <div className="bg-white/5 hover:bg-white/10 transition-colors px-6 py-2 rounded-full border border-white/10 inline-flex items-center gap-2 mb-2 backdrop-blur-md cursor-default">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="text-sm font-semibold tracking-wide text-neutral-200">Power your learning with AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
          Master Any Subject with <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">Quizz AI</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl leading-relaxed">
          Generate custom quizzes in seconds, test your knowledge, and track your progress instantly with our advanced AI engine.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 pt-8">
          <Link href="/quiz/new">
            <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 shadow-[0_0_20px_-3px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1">
              Generate Quiz
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-full border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 text-neutral-200 transition-all hover:-translate-y-1">
              View Dashboard
            </Button>
          </Link>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24 text-left pt-16 border-t border-neutral-800/50 relative">
          
          {/* Card 1 */}
          <div className="group flex flex-col gap-4 p-8 rounded-3xl bg-gradient-to-b from-neutral-900/50 to-neutral-950/50 border border-neutral-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] hover:-translate-y-1">
             <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-2 group-hover:bg-blue-500/20 transition-colors">
                <BrainCircuit className="w-7 h-7" />
             </div>
             <h3 className="text-2xl font-bold text-neutral-100">AI Generation</h3>
             <p className="text-neutral-400 leading-relaxed text-sm">Upload documents or provide topics, and let AI instantly craft the perfect quiz to test your knowledge dynamically.</p>
          </div>

          {/* Card 2 */}
          <div className="group flex flex-col gap-4 p-8 rounded-3xl bg-gradient-to-b from-neutral-900/50 to-neutral-950/50 border border-neutral-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)] hover:-translate-y-1">
             <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-2 group-hover:bg-indigo-500/20 transition-colors">
                <ListChecks className="w-7 h-7" />
             </div>
             <h3 className="text-2xl font-bold text-neutral-100">Interactive Learning</h3>
             <p className="text-neutral-400 leading-relaxed text-sm">Take quizzes in a sleek, distraction-free environment that maximizes your focus and drastically improves retention.</p>
          </div>

          {/* Card 3 */}
          <div className="group flex flex-col gap-4 p-8 rounded-3xl bg-gradient-to-b from-neutral-900/50 to-neutral-950/50 border border-neutral-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] hover:-translate-y-1">
             <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2 group-hover:bg-purple-500/20 transition-colors">
                <Sparkles className="w-7 h-7" />
             </div>
             <h3 className="text-2xl font-bold text-neutral-100">Instant Feedback</h3>
             <p className="text-neutral-400 leading-relaxed text-sm">Get automatic scoring, detailed dashboard insights, and celebratory rewards as you conquer each learning milestone.</p>
          </div>

        </div>

      </main>
    </div>
  );
}