import { Dispatch, SetStateAction } from "react";
import TextInput from "./text-input";

type Props = Readonly<{
  label: string;
  parenthetical?: string;
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  submitName: string;
}>;

export default function EmailInput(props: Props) {
  return <TextInput {...props} type="email" />;
}
