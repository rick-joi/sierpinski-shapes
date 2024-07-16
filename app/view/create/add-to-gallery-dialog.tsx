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
      <h3>All fields are optional</h3>
      <TextInput
        type={"text"}
        label={"Shape name"}
        name="shape-name"
        placeholder="untitled"
        value={shapeName}
        setValue={setShapeName}
      />
      <TextInput
        type={"text"}
        label={"Your name"}
        name={"your-name"}
        placeholder="anonymous"
        value={name}
        setValue={setName}
      />
      <TextInput
        type={"email"}
        label={"Your email address"}
        name={"your-email-address"}
        value={email}
        setValue={setEmail}
      />
      <p style={{ fontSize: "smaller" }}>
        (providing your email address will allow us to show you your gallery items when you visit the gallery from any
        device)
      </p>
    </Dialog>
  );
}
