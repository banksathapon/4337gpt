import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// function to verify valid hex string
export function isHexString(value: string) {
  return value.match(/^0x[0-9A-Fa-f]*$/);
}

// function to extract hex string from content
export function extractHexString(content: string) {
  const hexString = content.match(/0x[0-9A-Fa-f]*/g);
  return hexString;
}