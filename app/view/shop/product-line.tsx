import { Dispatch, SetStateAction } from "react";
import IconButton from "../_shared/forms/icon-button";
import ProductLineImage from "./product-line-image";

type Props = Readonly<{
  pluralName: string;
  singularName: string;
  text: string;
  startingPrice: number;
  imageNames: [string, string, string, string];
  setIsBuyDialogOpen: Dispatch<SetStateAction<boolean>>;
}>;

export default function ProductLine({
  pluralName,
  singularName,
  text,
  startingPrice,
  imageNames,
  setIsBuyDialogOpen,
}: Props) {
  //
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingTop: "min(var(--space-lg), 5vw)",
        paddingLeft: "min(var(--space-lg), 5vw)",
        paddingRight: "min(var(--space-lg), 5vw)",
        paddingBottom: "0",
        backgroundColor: "var(--color-gray-lightest)",
        boxShadow: "var(--shadow)",
        borderRadius: "var(--radius-md)",
        maxWidth: "70rem",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "min(50vw, 20rem)", marginRight: "var(--space-lg)", marginBottom: "var(--space-xl)" }}>
        <h1 style={{ marginTop: "0rem" }}>{pluralName}</h1>
        <div style={{ whiteSpace: "balance" }}>{text}</div>
        <div style={{ marginTop: "var(--space-md)", fontSize: "smaller" }}>
          Starting at ${startingPrice.toFixed(2)} + shipping
        </div>
        <IconButton
          buttonText={`Get your ${singularName}`}
          onClick={() => {
            setIsBuyDialogOpen(true);
          }}
          className="cta"
          style={{
            marginTop: "var(--space-lg)",
            paddingLeft: "var(--space-lg)",
            paddingRight: "var(--space-lg)",
            boxShadow: "var(--shadow)",
            fontSize: "larger",
            whiteSpace: "nowrap",
          }}
        />
      </div>
      <div
        style={{
          lineHeight: 0,
          marginLeft: "var(--space-lg)",
          marginRight: "var(--space-xs)",
        }}
      >
        <ProductLineImage
          imageName={imageNames[0]}
          singularName={singularName}
          height={10}
          width={15}
          top={-2.5}
          left={-2}
        />
        <ProductLineImage
          imageName={imageNames[1]}
          singularName={singularName}
          height={15}
          width={10}
          top={0}
          left={-2}
        />
        <br />
        <ProductLineImage
          imageName={imageNames[2]}
          singularName={singularName}
          height={15}
          width={10}
          top={-2.5}
          left={0.25}
        />
        <ProductLineImage
          imageName={imageNames[3]}
          singularName={singularName}
          height={10}
          width={15}
          top={-5}
          left={0.25}
        />
      </div>
    </div>
  );
}
