// ─────────────────────────────────────────────────────────────────
// app/lib/utils.ts
// ─────────────────────────────────────────────────────────────────
// Shared utility functions used across the app.
// ─────────────────────────────────────────────────────────────────
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * cn() — Merge Tailwind CSS classes safely.
 *
 * Use this instead of writing class strings manually.
 * It handles conditional classes and removes conflicts.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary", "text-sm")
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
/**
 * formatDate() — Format a date string to locale string.
 * @param dateStr - ISO date string or Date object
 */
export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
