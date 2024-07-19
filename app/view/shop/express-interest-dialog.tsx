import { Dispatch, SetStateAction } from "react";
import Dialog from "../_shared/utilities/dialog";
import ClickVsTapText from "../_shared/utilities/click-vs-tap-text";
import ControlWithLabelLayout from "../_shared/utilities/forms/control-with-label-layout";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ExpressInterestDialog({ isOpen, setIsOpen }: Props) {
  //
  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonText="Let us know you're interested"
      buttonIcon="/like-icon.png"
      formAction="/shop"
      width="30em"
      disclaimer="If enough people express interest, we&rsquo;ll build the shop!"
    >
      <h1 style={{ marginBottom: "1rem" }}>
        Thanks for <ClickVsTapText clickText={"clicking"} tapText={"tapping"} />
      </h1>
      <p>We didn&rsquo;t know whether anyone would 🤔 — so we haven&rsquo;t built the shop yet</p>
      <p>Share your email address, and you&rsquo;ll be among the first to know if / when the shop is built</p>
      <ControlWithLabelLayout label="Email address" isDisabled={false} id="email">
        <input type="email" name="email-address" required style={{ flexGrow: "1" }} />
      </ControlWithLabelLayout>
    </Dialog>
  );
}
