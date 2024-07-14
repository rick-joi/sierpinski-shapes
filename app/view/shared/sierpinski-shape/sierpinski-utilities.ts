export type Rotations = Readonly<{
  topLeft: number | null;
  topRight: number | null;
  bottomLeft: number | null;
  bottomRight: number | null;
}>;

export function getStageId(stage: number, prefix: string) {
  return `${prefix}Stage${stage}`;
}
