export type Rotations = Readonly<{
  topRight: number | null;
  topLeft: number | null;
  bottomRight: number | null;
  bottomLeft: number | null;
}>;

export function getStageId(stage: number, prefix: string) {
  return `${prefix}Stage${stage}`;
}
