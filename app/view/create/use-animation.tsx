import { useEffect, useState } from "react";

type AnimationValues = {
  hasLastAnimationCompleted: boolean;
  counter: number;
  rotations: [number, number, number, number];
  increments: [number, number, number, number];
};

export default function useAnimation(
  //
  isAnimating: boolean,
  setTopLeftRotation: React.Dispatch<React.SetStateAction<number>>,
  setTopRightRotation: React.Dispatch<React.SetStateAction<number>>,
  setBottomLeftRotation: React.Dispatch<React.SetStateAction<number>>,
  setBottomRightRotation: React.Dispatch<React.SetStateAction<number>>,
  setColor: React.Dispatch<React.SetStateAction<string>>
) {
  const [animationValues, setAnimationValues] = useState<AnimationValues>({
    hasLastAnimationCompleted: true,
    counter: 0,
    rotations: [0, 0, 0, 0],
    increments: [-1, 1, 1, -1],
  });
  const [redDirection, setRedDirection] = useState<1 | -1>(1);
  const [greenDirection, setGreenDirection] = useState<1 | -1>(1);
  const [blueDirection, setBlueDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (isAnimating && animationValues.hasLastAnimationCompleted) {
      setAnimationValues((previous) => ({
        hasLastAnimationCompleted: false,
        counter: previous.counter,
        rotations: [
          previous.rotations[0] + previous.increments[0],
          previous.rotations[1] + previous.increments[1],
          previous.rotations[2] + previous.increments[2],
          previous.rotations[3] + previous.increments[3],
        ],
        increments: previous.increments,
      }));
      setTopLeftRotation((previous) => (360 + previous + animationValues.increments[0]) % 360);
      setTopRightRotation((previous) => (360 + previous + animationValues.increments[1]) % 360);
      setBottomLeftRotation((previous) => (360 + previous + animationValues.increments[2]) % 360);
      setBottomRightRotation((previous) => (360 + previous + animationValues.increments[3]) % 360);
      setColor((previous) =>
        getNextColor(
          previous,
          redDirection,
          setRedDirection,
          greenDirection,
          setGreenDirection,
          blueDirection,
          setBlueDirection
        )
      );
      setTimeout(() => {
        setAnimationValues((previous) => ({
          hasLastAnimationCompleted: true,
          counter: (previous.counter + 1) % 15,
          rotations: previous.rotations,
          increments: [
            getNextIncrement(previous.counter, previous.increments[0]),
            getNextIncrement(previous.counter, previous.increments[1]),
            getNextIncrement(previous.counter, previous.increments[2]),
            getNextIncrement(previous.counter, previous.increments[3]),
          ],
        }));
      }, 100);
    }
  }, [
    isAnimating,
    animationValues,
    setAnimationValues,
    setTopLeftRotation,
    setTopRightRotation,
    setBottomLeftRotation,
    setBottomRightRotation,
    setColor,
    redDirection,
    setRedDirection,
    greenDirection,
    setGreenDirection,
    blueDirection,
    setBlueDirection,
  ]);
}

function getNextIncrement(counter: number, previousIncrement: number) {
  //
  const shouldChange = counter === 0 && Math.random() > 0.75;
  if (shouldChange) {
    const unconstrainedNextIncrement = previousIncrement + 0.25 - 0.5 * Math.random();
    return Math.min(Math.max(unconstrainedNextIncrement, -1), 1);
  } else {
    return previousIncrement;
  }
}

function getNextColor(
  previous: string,
  redDirection: 1 | -1,
  setRedDirection: React.Dispatch<React.SetStateAction<1 | -1>>,
  greenDirection: 1 | -1,
  setGreenDirection: React.Dispatch<React.SetStateAction<1 | -1>>,
  blueDirection: 1 | -1,
  setBlueDirection: React.Dispatch<React.SetStateAction<1 | -1>>
) {
  //
  const red = getNextColorComponent(previous, 1, 3, redDirection, setRedDirection);
  const green = getNextColorComponent(previous, 3, 5, greenDirection, setGreenDirection);
  const blue = getNextColorComponent(previous, 5, 7, blueDirection, setBlueDirection);

  return "#" + red + green + blue;
}

function getNextColorComponent(
  previousFullColor: string,
  startIndex: number,
  endIndex: number,
  colorDirection: 1 | -1,
  setColorDirection: React.Dispatch<React.SetStateAction<1 | -1>>
): string {
  //
  const INCREMENT = 1;
  const previousInt = parseInt(previousFullColor.substring(startIndex, endIndex), 16);
  const adjustedColorDirection = previousInt >= 128 - INCREMENT ? -1 : colorDirection;
  let nextInt = previousInt + Math.round(Math.random() * INCREMENT * adjustedColorDirection);

  // 192 prevents background going to black
  if (nextInt >= 128 - INCREMENT) {
    setColorDirection(-1);
  } else if (nextInt <= INCREMENT) {
    setColorDirection(1);
    nextInt = INCREMENT;
  }

  return nextInt.toString(16).padStart(2, "0");
}
