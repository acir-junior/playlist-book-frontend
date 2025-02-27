import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceHTML(str: string): string {
  return str.replace(/<[^>]*>?/gm, '');
}

export function createData<T>(data: T) {
  return { ...data } as T;
}
