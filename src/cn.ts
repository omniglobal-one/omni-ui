import clsx, { type ClassValue } from 'clsx';

/** Thin wrapper, kept as its own module so every component imports the
 * same one thing — if OMNI ever wants tailwind-merge's conflict resolution
 * later, it changes here once, not in twelve files. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
