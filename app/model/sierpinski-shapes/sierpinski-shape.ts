import { Rotations } from "./rotations";

export default class SierpinskiShape {
  //
  readonly id: number;
  readonly name: string;
  readonly rotations: Rotations;
  readonly color: string;
  readonly backgroundColor: string | undefined;

  constructor(
    id: number,
    name: string,
    topLeftRotation: number | null,
    topRightRotation: number | null,
    bottomLeftRotation: number | null,
    bottomRightRotation: number | null,
    color: string,
    backgroundColor: string | undefined
  ) {
    this.id = id;
    this.name = name;
    this.rotations = {
      topLeft: topLeftRotation,
      topRight: topRightRotation,
      bottomLeft: bottomLeftRotation,
      bottomRight: bottomRightRotation,
    };
    this.color = color;
    this.backgroundColor = backgroundColor;
  }
}
