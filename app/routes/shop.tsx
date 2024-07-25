import { ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";

import * as FormUtils from "~/view/_shared/forms/form-utils";
import { redirectWithMessage } from "~/view/_shared/miscellaneous/utilities/redirect-utilities";

import ExpressInterestDialog from "~/view/shop/express-interest-dialog";
import ProductLine from "~/view/shop/product-line";

export default function ShopRoute() {
  //
  const artPrints: [string, string, string, string] = [
    "frame-yellow.jpg",
    "frame-green.jpg",
    "frame-pink.jpg",
    "frame-purple.jpg",
  ];
  const tShirts: [string, string, string, string] = [
    "t-shirt-purple.jpg",
    "t-shirt-navy.jpg",
    "t-shirt-green.jpg",
    "t-shirt-orange.jpg",
  ];
  const pillows: [string, string, string, string] = [
    "pillow-black.jpg",
    "pillow-orange.jpg",
    "pillow-tan.jpg",
    "pillow-pink.jpg",
  ];
  const sportswear: [string, string, string, string] = [
    "sportswear-mint.jpg",
    "sportswear-green.jpg",
    "sportswear-teal.jpg",
    "sportswear-blue.jpg",
  ];
  const mugs: [string, string, string, string] = [
    "mug-orange.jpg",
    "mug-marroon.jpg",
    "mug-green.jpg",
    "mug-purple.jpg",
  ];
  const more: [string, string, string, string] = ["more-pink.jpg", "more-purple.jpg", "more-blue.jpg", "more-ice.jpg"];
  //
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);

  //todo: simplify the text at the top of the screen across gallery, learn, and shop pages
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "var(--space-2xl)" }}>
      <div>
        <p style={{ textAlign: "center" }}>
          Design your own unique <em>Sierpinski Shape</em> using the <Link to="/create">create page</Link>, and then
          choose any of the products below
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "var(--space-lg)",
          rowGap: "var(--space-lg)",
        }}
      >
        <ProductLine
          pluralName="Art prints"
          singularName="art print"
          text="Choose from a wide variety of sizes and frame options"
          startingPrice={19.95}
          imageNames={artPrints}
          setIsBuyDialogOpen={setIsBuyDialogOpen}
        />
        <ProductLine
          pluralName="T-shirts"
          singularName="t-shirt"
          text="You'll look sharp in a one-of-a-kind Sierpinski Shape t-shirt"
          startingPrice={29.95}
          imageNames={tShirts}
          setIsBuyDialogOpen={setIsBuyDialogOpen}
        />
        <ProductLine
          pluralName={"Pillows"}
          singularName="pillow"
          text={"Unique designs for your unique home"}
          startingPrice={34.95}
          imageNames={pillows}
          setIsBuyDialogOpen={setIsBuyDialogOpen}
        />
        <ProductLine
          pluralName={"Sportswear"}
          singularName="sportswear"
          text={"Perform at your best — whatever your sport — in Sierpinski Shapes sports apparel"}
          startingPrice={29.95}
          imageNames={sportswear}
          setIsBuyDialogOpen={setIsBuyDialogOpen}
        />
        <ProductLine
          pluralName={"Mugs"}
          singularName="mug"
          text={"Hot drinks taste better in a Sierpinski Shapes mug"}
          startingPrice={19.95}
          imageNames={mugs}
          setIsBuyDialogOpen={setIsBuyDialogOpen}
        />
        <ProductLine
          pluralName={"And more..."}
          singularName="favorite"
          text={"Let everyone know you're a Sierpinski Shapes fanatic"}
          startingPrice={9.95}
          imageNames={more}
          setIsBuyDialogOpen={setIsBuyDialogOpen}
        />
      </div>
      <ExpressInterestDialog isOpen={isBuyDialogOpen} setIsOpen={setIsBuyDialogOpen} />
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  //
  try {
    const formData = await request.formData();
    const emailAddress = FormUtils.getFormString(formData, "email-address", "“untitled”");
    console.log(`Shop interest expressed by ${emailAddress}`);

    throw Error("you'll need to let Rick know about your interest directly");
    //
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return redirectWithMessage(`/shop`, `Unable to record email address — ${message}`);
  }
}
