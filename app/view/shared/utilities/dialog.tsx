import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import classes from "./dialog.module.css";
import { Form } from "@remix-run/react";
import IconButton from "./icon-button";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  width: string;
  actionText: string;
  actionIcon: string;
  children: React.ReactNode;
  disclaimer?: ReactNode;
};

export default function Dialog({ isOpen, setIsOpen, width, actionText, actionIcon, children, disclaimer }: Props) {
  //
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
      style={{ width: width, boxShadow: "4px 4px 5px rgba(0, 0, 0, 0.3)" }}
    >
      <div className={classes["header"]}>
        <button onClick={() => setIsOpen(false)} title="Cancel">
          X
        </button>
      </div>
      <Form method="post" action="/gallery" ref={formRef}>
        <div className={classes["body"]}>{children}</div>
        <div className={classes["footer"]}>
          <IconButton
            buttonText={actionText}
            iconImage={actionIcon}
            isDisabled={false}
            onClick={() => {
              formRef.current?.submit();
            }}
            className={"cta " + classes["cta"]}
          />
          <p className={classes["disclaimer"]}>{disclaimer}</p>
        </div>
      </Form>
    </dialog>
  );
}
