import { Dispatch, SetStateAction, useId } from "react";

type Props = Readonly<{
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isDisabled?: boolean;
}>;

export default function ColorInput(props: Props) {
  //
  const id = useId();
  return (
    <span style={{ whiteSpace: "nowrap", textAlign: "right" }}>
      <label htmlFor={id} style={{ padding: "1rem", color: props.isDisabled ? "lightgray" : "default" }}>
        {props.label}:
      </label>
      <input
        id={id}
        type="color"
        value={props.value}
        onChange={inputOnChange}
        style={{ height: "2rem", width: "4rem", textAlign: "center" }}
        disabled={props.isDisabled}
      />
    </span>
  );

  function inputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setValue(event.target.value);
  }
}
