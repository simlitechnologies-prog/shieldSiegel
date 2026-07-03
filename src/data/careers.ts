import type { Career } from "@/types";
import careersJson from "./careers.json";

export const careers: Career[] = careersJson as Career[];

export function getCareerBySlug(slug: string) {
  return careers.find((c) => c.slug === slug);
}
