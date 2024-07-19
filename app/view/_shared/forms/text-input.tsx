import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";

type Props = Readonly<{
  label: string;
  parenthetical?: string;
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  submitName: string;
  type?: "text" | "email";
}>;

export default function TextInput({ label, parenthetical, placeholder, value, setValue, submitName, type }: Props) {
  //
  const id = useId();

  return (
    <ControlWithLabelLayout label={label} parenthetical={parenthetical} isDisabled={false} id={id}>
      <input
        type={type ?? "text"}
        name={submitName}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        style={{ flexGrow: 1 }}
      />
    </ControlWithLabelLayout>
  );
}
