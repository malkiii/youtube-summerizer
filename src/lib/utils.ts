import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { removeMarkdown } from '@excalidraw/markdown-to-text';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setCookie(name: string, value: string, days = 1) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

export function markdownToText(markdown = '') {
  return removeMarkdown(markdown, { listUnicodeChar: '-', useImgAltText: true });
}
