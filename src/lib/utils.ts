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
  return new Promise<void>((resolve) => {
    toast.success(message, {
      onDismiss: () => {
        resolve();
      },
    });
  }).then(() => window.location.reload());
}

export function requestError(message: string) {
  return new Promise<void>((resolve) => {
    toast.error(message, {
      onDismiss: () => {
        resolve();
      },
    });
  }).then(() => window.location.reload());
}

export function reloadComponent(navigate: NavigateFunction) {
  return navigate(0);
}

export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
}
