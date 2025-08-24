import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SIZES } from "./types";
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const _res = {
  success: (
    status: number = 200,
    message: string = "Resource fetched successfully.",
    data?: any
  ) =>
    new NextResponse(JSON.stringify({ failed: false, message, data }), {
      status,
    }),
  error: (status?: number, message: string = "Error fetching resource") =>
    new NextResponse(JSON.stringify({ failed: true, message }), {
      status: status || 500,
    }),
};

export const convertToWordDate = (
  dateStr: Date | string
): string | undefined => {
  const date = new Date(dateStr);
  if (date.toString() === "Invalid Date") {
    return undefined;
  }
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix} of ${month}, ${year}`;
};

export const getSizeMultiplicationFactor = (size: SIZES): number => {
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

  return mf;
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};
