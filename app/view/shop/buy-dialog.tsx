import { Dispatch, SetStateAction } from "react";
import Dialog from "../shared/utilities/dialog";
import ClickVsTapText from "../shared/utilities/click-vs-tap-text";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function BuyDialog({ isOpen, setIsOpen }: Props) {
  //
  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      actionText="Let us know you're interested"
      actionIcon="/like-icon.png"
      width="30em"
    >
      <h1 style={{ marginBottom: "1rem" }}>
        Thanks for <ClickVsTapText clickText={"clicking"} tapText={"tapping"} />
      </h1>
      <p>We didn&rsquo;t know whether anyone would 🤔 — so we haven&rsquo;t built the shop yet</p>
      <p>Share your email address below, and you&rsquo;ll be among the first to know if / when the shop is built</p>
      <p>If enough people express interest, we&rsquo;ll build the shop!</p>
      <input type="email" />
    </Dialog>
  );
}
