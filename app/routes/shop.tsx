import { Link } from "@remix-run/react";
import ProductLine from "~/view/shop/product-line";

export default function Index() {
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
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "5rem" }}>
      <div style={{ display: "inline-block", margin: "auto" }}>
        <p>
          Design your own unique <em>Sierpinski Shape</em> using the <Link to="/create">create page</Link>, and then
          choose any of the products below
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <ProductLine
          pluralName="Art prints"
          singularName="art print"
          text="Choose from a wide variety of sizes and frame options"
          imageNames={artPrints}
        />
        <ProductLine
          pluralName="T-shirts"
          singularName="t-shirt"
          text="You'll look sharp in a one-of-a-kind Sierpinski Shape t-shirt"
          imageNames={tShirts}
        />
        <ProductLine
          pluralName={"Pillows"}
          singularName="pillow"
          text={"You won't find these at Home Goods"}
          imageNames={pillows}
        />
        <ProductLine
          pluralName={"Sportswear"}
          singularName="sportswear"
          text={"Perform at your best — whatever your sport — in Sierpinski Shapes sports apparel"}
          imageNames={sportswear}
        />
        <ProductLine
          pluralName={"Mugs"}
          singularName="mug"
          text={"Hot drinks taste better in a Sierpinski Shapes mug"}
          imageNames={mugs}
        />
        <ProductLine
          pluralName={"And more..."}
          singularName="favorite"
          text={"Let everyone know you're a Sierpinski Shapes fanatic"}
          imageNames={more}
        />
      </div>
    </div>
  );
}
