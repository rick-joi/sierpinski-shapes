import { Link } from "@remix-run/react";
import ProductLine from "~/view/shop/product-line";

export default function Index() {
  //
  const imageNames: [string, string, string, string] = [
    "wood-frame-dark-gray-and-bright-yellow.png",
    "wood-frame-green-on-white.png",
    "wood-frame-light-pink-on-white.png",
    "white-frame-dark-purple-shape.png",
  ];
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
          imageNames={imageNames}
        />
        <ProductLine
          pluralName="T-shirts"
          singularName="t-shirt"
          text="You'll look sharp in a one-of-a-kind Sierpinski Shape t-shirt"
          imageNames={imageNames}
        />
        <ProductLine
          pluralName={"Pillows"}
          singularName="pillow"
          text={"You won't find these at Home Goods"}
          imageNames={imageNames}
        />
        <ProductLine
          pluralName={"Sportswear"}
          singularName="sportswear"
          text={"Perform at your best — whatever your sport — in Sierpinski Shapes sports apparel"}
          imageNames={imageNames}
        />
        <ProductLine
          pluralName={"Mugs"}
          singularName="mug"
          text={"Hot drinks taste better in a Sierpinski Shapes mug"}
          imageNames={imageNames}
        />
        <ProductLine
          pluralName={"And more..."}
          singularName="favorite"
          text={"Let everyone know you're a Sierpinski Shapes fanatic"}
          imageNames={imageNames}
        />
      </div>
    </div>
  );
}
