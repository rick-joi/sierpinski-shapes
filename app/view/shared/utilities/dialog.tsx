import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import classes from "./dialog.module.css";
import { Form } from "@remix-run/react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  width: string;
  actionText: string;
  children: React.ReactNode;
};

export default function Dialog({ isOpen, setIsOpen, width, actionText, children }: Props) {
  //
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current?.open && !isOpen) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && isOpen) {
      dialogRef.current?.showModal();
    }
  }, [isOpen]);

  //todo: add standard footer with cancel button and action button, and take action function prop
  return (
    <dialog
      ref={dialogRef}
      className={classes["standard-dialog-component"]}
      onClose={() => setIsOpen(false)}
      style={{ width: width }}
    >
      <div className={classes["header"]}>
        <button onClick={() => setIsOpen(false)} title="Cancel">
          X
        </button>
      </div>
      <Form method="post" action="/gallery">
        <div className={classes["body"]}>{children}</div>
        <div className={classes["footer"]}>
          <input type="submit" value={actionText} />
        </div>
      </Form>
    </dialog>
  );
}
