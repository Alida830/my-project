import { loginUser } from "@/actions/loginUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex text-foreground bg-background">
      {/* Left Column: Visual Identity */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-zinc-950/50 overflow-hidden relative border-r">
        {/* Decorative background glows */}
        <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -top-32 -left-32 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -bottom-32 -right-32 animate-pulse" />
        
        <div className="relative z-10 p-12 text-center flex flex-col items-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 drop-shadow-md">
            Welcome back to <span className="text-primary glow">Quizz AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Log in to manage your quizzes and keep up with your studying progress.
          </p>
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="flex-1 flex justify-center items-center p-8 lg:p-12 relative z-10">
        <div className="w-full max-w-md bg-zinc-950/40 p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-2">Sign in to Quizz AI</h2>
          <p className="text-sm text-muted-foreground mb-6">Welcome back! Please enter your details.</p>
          
          <form action={loginUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email address</label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-zinc-900" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
              <Input id="password" name="password" type="password" required placeholder="••••••••" className="bg-zinc-900" />
            </div>
            
            <Button type="submit" className="w-full mt-2 font-bold py-3 text-white bg-blue-600 hover:bg-blue-500">
              Sign in
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-neutral-400">
            Don't have an account? <Link href="/sign-up" className="text-blue-500 hover:text-blue-400 font-medium">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}