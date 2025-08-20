import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return <SignIn signInUrl="/sign-in" redirectUrl="/chat" />;
};

export default SignInPage;
