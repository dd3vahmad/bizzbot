import { logo } from "@/assets";
import { app } from "@/lib/constants";
import { SIZES } from "@/lib/types";
import { getSizeMultiplicationFactor } from "@/lib/utils";
import Image from "next/image";

interface IProp {
  size: SIZES;
  className?: string;
}

const Logo = ({ size = "5xl", className }: IProp) => {
  const mf = getSizeMultiplicationFactor(size);

  return (
    <Image
      src={logo.src}
      height={logo.height * mf}
      width={logo.width * mf}
      alt={app.name}
      className={`cursor-pointer ${className}`}
    />
  );
};

export default Logo;
