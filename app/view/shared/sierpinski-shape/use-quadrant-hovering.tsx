import { Dispatch, SetStateAction, useState } from "react";

export type SetIsHovering = Readonly<{
  topLeft: Dispatch<SetStateAction<boolean>>;
  topRight: Dispatch<SetStateAction<boolean>>;
  bottomLeft: Dispatch<SetStateAction<boolean>>;
  bottomRight: Dispatch<SetStateAction<boolean>>;
}>;

export type IsHovering = Readonly<{
  topLeft: boolean;
  topRight: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
}>;

export function useQuadrantHovering() {
  //
  const [isHoveringOverTopLeft, setIsHoveringOverTopLeft] = useState(false);
  const [isHoveringOverTopRight, setIsHoveringOverTopRight] = useState(false);
  const [isHoveringOverBottomLeft, setIsHoveringOverBottomLeft] = useState(false);
  const [isHoveringOverBottomRight, setIsHoveringOverBottomRight] = useState(false);

  const setIsHovering: SetIsHovering = {
    topLeft: setIsHoveringOverTopLeft,
    topRight: setIsHoveringOverTopRight,
    bottomLeft: setIsHoveringOverBottomLeft,
    bottomRight: setIsHoveringOverBottomRight,
  };

  const isHovering: IsHovering = {
    topLeft: isHoveringOverTopLeft,
    topRight: isHoveringOverTopRight,
    bottomLeft: isHoveringOverBottomLeft,
    bottomRight: isHoveringOverBottomRight,
  };

  return [isHovering, setIsHovering] as const;
}
