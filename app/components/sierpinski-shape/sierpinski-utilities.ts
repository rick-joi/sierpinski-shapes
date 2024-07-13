export type Quadrant = Readonly<{ position: 1 | 2 | 3 | 4; rotation: number }>;
export type Quadrants = Readonly<{
  topRight: Quadrant | null;
  topLeft: Quadrant | null;
  bottomRight: Quadrant | null;
  bottomLeft: Quadrant | null;
}>;

export function getStageId(stage: number, prefix: string) {
  return `${prefix}Stage${stage}`;
}
