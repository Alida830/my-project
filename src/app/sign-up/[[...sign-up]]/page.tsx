import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp
      routing="path"
      path="/sign-up"
      fallbackRedirectUrl="/(user)/dashboard"
      afterSignUpUrl="/(user)/dashboard"
      redirectUrl="/(user)/dashboard"
    />
  );
}