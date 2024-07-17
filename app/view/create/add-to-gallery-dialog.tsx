import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "../shared/utilities/dialog";
import TextInput from "./text-input";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddToGalleryDialog({ isOpen, setIsOpen }: Props) {
  //
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [shapeName, setShapeName] = useState("");

  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen} actionText="Add to gallery" width="30em">
      <h3 style={{ marginBottom: "1rem" }}>All fields are optional</h3>
      <TextInput
        type={"text"}
        label={"Shape name"}
        parenthetical={"(it's more fun if you name it)"}
        name="shape-name"
        placeholder="untitled"
        value={shapeName}
        setValue={setShapeName}
      />
      <TextInput
        type={"text"}
        label={"Your name"}
        parenthetical={"(it's more fun if you claim it)"}
        name={"your-name"}
        placeholder="anonymous"
        value={name}
        setValue={setName}
      />
      <TextInput
        type={"email"}
        label={"Your email address"}
        parenthetical={"(don't get stuck having to declaim it)"}
        name={"your-email-address"}
        value={email}
        setValue={setEmail}
      />
      <p style={{ fontSize: "smaller", lineHeight: "150%", textAlign: "center" }}>
        Providing your email address will allow us to still know it&rsquo;s you after your session times out or if you
        visit from another device — knowing it&rsquo;s you will allow us to show you your chosen gallery items when
        you&nbsp;visit&nbsp;the&nbsp;gallery
      </p>
    </Dialog>
  );
}
