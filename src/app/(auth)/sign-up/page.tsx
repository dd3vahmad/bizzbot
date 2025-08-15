import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp signInUrl="/sign-up" />;
};

export default SignUpPage;
