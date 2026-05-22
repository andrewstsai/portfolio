import type { Picture } from "@/data/pictures";

// Greedy column-fill simulation using orientation height ratios.
// Returns the set of array indices that land in the first `rows` rows
// of each column — matches what CSS columns does internally.
export function columnTopIndices(
  pics: Picture[],
  cols: number,
  rows: number
): Set<number> {
  const buckets: number[][] = Array.from({ length: cols }, () => []);
  const heights = new Array<number>(cols).fill(0);
  pics.forEach((p, i) => {
    const h = p.orientation === "portrait" ? 1.33 : 0.75;
    const c = heights.indexOf(Math.min(...heights));
    buckets[c].push(i);
    heights[c] += h;
  });
  return new Set(buckets.flatMap((b) => b.slice(0, rows)));
}
