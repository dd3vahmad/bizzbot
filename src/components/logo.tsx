import { logo } from "@/assets";
import Image from "next/image";

interface IProp {
  size:
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl";
  className?: string;
}

const Logo = ({ size = "5xl" }: IProp) => {
  let mf = 1;

  switch (size) {
    case "xxs":
      mf = 0.1;
      break;
    case "xs":
      mf = 0.2;
      break;
    case "sm":
      mf = 0.3;
      break;
    case "md":
      mf = 0.4;
      break;
    case "lg":
      mf = 0.5;
      break;
    case "xl":
      mf = 0.6;
      break;
    case "2xl":
      mf = 0.7;
      break;
    case "3xl":
      mf = 0.8;
      break;
    case "4xl":
      mf = 0.9;
      break;

    default:
      mf = 1;
      break;
  }

  return (
    <Image
      src={logo.src}
      height={logo.height * mf}
      width={logo.width * mf}
      alt="BizzBot"
      className="cursor-pointer"
    />
  );
};

export default Logo;
