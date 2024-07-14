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
  setBottomRightRotation: React.Dispatch<React.SetStateAction<number>>
) {
  const [animationValues, setAnimationValues] = useState<AnimationValues>({
    hasLastAnimationCompleted: true,
    counter: 0,
    rotations: [0, 0, 0, 0],
    increments: [-1, 1, 1, -1],
  });

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
