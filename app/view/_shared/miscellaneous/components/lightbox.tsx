import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";

import classes from "./lightbox.module.css";

type Props = Readonly<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}>;

export default function Lightbox({ isOpen, setIsOpen, children }: Props) {
  //
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isOpen) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && isOpen) {
      dialogRef.current?.showModal();
    }
  }, [isOpen]);

  return (
    <dialog onClose={() => setIsOpen(false)} className={classes["lightbox"]}>
      {children}
    </dialog>
  );
}
