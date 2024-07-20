import { Dispatch, SetStateAction, useState } from "react";

import Dialog from "../_shared/miscellaneous/components/dialog";
import TextInput from "../_shared/forms/text-input";
import EmailInput from "../_shared/forms/email-input";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddToGalleryDialog({ isOpen, setIsOpen }: Props) {
  //
  const disclaimer = (
    <>
      All fields are optional
      <br />
      <br />
      Providing your email address will allow us to still know it&rsquo;s you after your session times out or if you
      visit from another device — knowing it&rsquo;s you will allow us to show you your chosen gallery items when
      you&nbsp;visit&nbsp;the&nbsp;gallery
    </>
  );

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [shapeName, setShapeName] = useState("");

  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonText="Add to gallery"
      buttonIcon="/like-icon.png"
      formAction="/gallery"
      width="30em"
      disclaimer={disclaimer}
    >
      <h3 style={{ marginBottom: "1rem" }}>Your shape is beautiful!</h3>
      <TextInput
        label={"Shape name"}
        parenthetical={"(it’s more fun if you name it)"}
        placeholder="untitled"
        value={shapeName}
        setValue={setShapeName}
        submitName="shape-name"
      />
      <TextInput
        label={"Your name"}
        parenthetical={"(it’s more fun if you claim it)"}
        placeholder="anonymous"
        value={name}
        setValue={setName}
        submitName={"your-name"}
      />
      <EmailInput
        label={"Your email address"}
        parenthetical={"(see below)"}
        value={email}
        setValue={setEmail}
        submitName={"your-email-address"}
      />
    </Dialog>
  );
}
