import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import classes from "./dialog.module.css";
import { Form } from "@remix-run/react";
import IconButton from "../../forms/icon-button";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  width: string;
  buttonText: string;
  buttonIcon: string;
  formAction: string;
  children: React.ReactNode;
  disclaimer?: ReactNode;
};

export default function Dialog({
  isOpen,
  setIsOpen,
  width,
  buttonText,
  buttonIcon,
  formAction,
  children,
  disclaimer,
}: Props) {
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

  return (
    <dialog
      ref={dialogRef}
      className={classes["standard-dialog-component"]}
      onClose={() => setIsOpen(false)}
      style={{ width: width, boxShadow: "var(--shadow-deep)", position: "relative" }}
    >
      <div className={classes["header"]}>
        <button onClick={() => setIsOpen(false)} title="Cancel">
          X
        </button>
      </div>
      <Form method="post" action={formAction} ref={formRef}>
        <div className={classes["body"]}>{children}</div>
        <div className={classes["footer"]}>
          <IconButton
            buttonText={buttonText}
            iconImage={buttonIcon}
            isDisabled={false}
            onClick={() => {
              if (formRef.current?.checkValidity()) {
                formRef.current?.submit();
              }
            }}
            isCallToAction={true}
          />
          <p className={classes["disclaimer"]}>{disclaimer}</p>
        </div>
      </Form>
    </dialog>
  );
}
