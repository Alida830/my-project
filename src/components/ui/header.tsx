import { Button } from "./button";
import Link from "next/link";
import { auth, signOut } from "@/auth";

const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          
          <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              Quizz AI
            </h1>
          </Link>

          <div className="flex items-center gap-4">

            {!session ? (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="hidden sm:inline-flex rounded-full px-6 transition-all">
                    Log in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="hidden sm:inline-block">
                  <Button variant="ghost" className="rounded-full font-medium text-muted-foreground hover:text-foreground">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/discover" className="hidden sm:inline-block">
                  <Button variant="ghost" className="rounded-full font-medium text-muted-foreground hover:text-foreground">
                    Discover
                  </Button>
                </Link>
                <div className="hidden sm:block text-sm text-neutral-400 mr-2">
                  {session.user?.name || session.user?.email?.split("@")[0]}
                </div>
                <form action={async () => {
                   "use server";
                   await signOut({ redirectTo: "/" });
                }}>
                  <Button type="submit" variant="outline" className="rounded-full">Log out</Button>
                </form>
              </>
            )}

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;