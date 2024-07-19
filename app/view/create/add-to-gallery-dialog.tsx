import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "../shared/utilities/dialog";
import TextInput from "../shared/utilities/forms/text-input";

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
      actionText="Add to gallery"
      actionIcon="/like-icon.png"
      width="30em"
      disclaimer={disclaimer}
    >
      <h3 style={{ marginBottom: "1rem" }}>Your shape is beautiful!</h3>
      <TextInput
        type={"text"}
        label={"Shape name"}
        parenthetical={"(it’s more fun if you name it)"}
        name="shape-name"
        placeholder="untitled"
        value={shapeName}
        setValue={setShapeName}
      />
      <TextInput
        type={"text"}
        label={"Your name"}
        parenthetical={"(it’s more fun if you claim it)"}
        name={"your-name"}
        placeholder="anonymous"
        value={name}
        setValue={setName}
      />
      <TextInput
        type={"email"}
        label={"Your email address"}
        parenthetical={"(see below)"}
        name={"your-email-address"}
        value={email}
        setValue={setEmail}
      />
    </Dialog>
  );
}
