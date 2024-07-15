import { useEffect, useState } from "react";

type WindowSize = { width: number; height: number };

export default function useWindowSize() {
  //
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 1024,
    height: 1024,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
