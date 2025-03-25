import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import { NavigateFunction } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceHTML(str: string): string {
  return str.replace(/<[^>]*>?/gm, '');
}

export function createData<T>(data: T) {
  return { ...data } as T;
}

export function requestSuccess(message: string) {
  return toast.success(message);
}

export function requestError(message: string) {
  return toast.error(message);
}

export function reloadComponent(navigate: NavigateFunction) {
  return navigate(0);
}

export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
}
