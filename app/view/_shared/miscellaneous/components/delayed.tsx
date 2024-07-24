import React, { useState, useEffect } from "react";

type Props = Readonly<{
  delay: number;
  children: React.ReactNode;
}>;

export default function Delayed({ children, delay }: Props) {
  //
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isShown ? children : null;
}
