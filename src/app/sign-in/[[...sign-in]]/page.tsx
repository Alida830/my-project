import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/(user)/dashboard"
      afterSignInUrl="/(user)/dashboard"
      redirectUrl="/(user)/dashboard"
    />
  );
}