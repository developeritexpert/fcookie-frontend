// src/lib/utils.ts - SIMPLE VERSION
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}