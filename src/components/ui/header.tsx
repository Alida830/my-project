"use client";
import { Button } from "./button";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header>
      <nav className="px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          
          <h1 className="text-3xl font-bold">Quizz AI</h1>

          <div className="flex items-center gap-4">

            {/* When user is signed out */}
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="link" className="rounded-xl border">
                  Sign In
                </Button>
              </Link>
            </SignedOut>

            {/* When user is signed in */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;