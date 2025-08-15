import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp signInUrl="/sign-in" redirectUrl={"/chat"} />;
};

export default SignUpPage;
