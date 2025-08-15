import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return <SignIn signUpUrl="/sign-up" redirectUrl={"/chat"} />;
};

export default SignInPage;
