export type ChildRotations = Readonly<[number | null, number | null, number | null, number | null]>;

export function getStageId(stage: number, prefix: string) {
  return `${prefix}Stage${stage}`;
}
