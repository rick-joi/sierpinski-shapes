import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";

type Props = Readonly<{
  type: "text" | "color" | "email";
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}>;
export default function TextInput({ type, label, name, placeholder, value, setValue }: Props) {
  const id = useId();
  return (
    <ControlWithLabelLayout label={label} isDisabled={false} id={id}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        style={{ flexGrow: 1 }}
      />
    </ControlWithLabelLayout>
  );
}
