export type Quadrant = Readonly<{ rotation: number; color: string; opacity: number }>;
export type Quadrants = Readonly<{
  topLeft: Quadrant | null;
  topRight: Quadrant | null;
  bottomRight: Quadrant | null;
  bottomLeft: Quadrant | null;
}>;

//todo: type is better than class in this case?
// export class Quadrant {
//   //
//   readonly rotation: number;
//   readonly color: string;
//   readonly opacity: number;

//   constructor(rotation: number, color: string, opacity: number) {
//     this.rotation = rotation;
//     this.color = color;
//     this.opacity = opacity;
//   }
// }

export function getStageId(stage: number, prefix: string) {
  return `${prefix}Stage${stage}`;
}
