import IconButton from "../shared/utilities/icon-button";
import ProductLineImage from "./product-line-image";

type Props = Readonly<{
  pluralName: string;
  singularName: string;
  text: string;
  imageNames: [string, string, string, string];
}>;

export default function ProductLine({ pluralName, singularName, text, imageNames }: Props) {
  console.log(imageNames);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        margin: "2.5rem",
        backgroundColor: "#f5f5f5",
        padding: "2.5rem",
        paddingBottom: "0",
        boxShadow: "4px 4px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ width: "20rem", marginRight: "2.5rem", marginBottom: "5rem" }}>
        <h1 style={{ marginTop: "0rem" }}>{pluralName}</h1>
        <div style={{ whiteSpace: "balance" }}>{text}</div>
        <IconButton
          buttonText={`Get your ${singularName}`}
          onClick={() => {}}
          className="cta"
          style={{
            marginTop: "2rem",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            boxShadow: "4px 4px 5px rgba(0, 0, 0, 0.3)",
            fontSize: "larger",
          }}
        />
      </div>
      <div style={{ lineHeight: 0, marginLeft: "2.5rem" }}>
        <ProductLineImage imageName={imageNames[0]} singularName={singularName} width={15} top={-2.5} left={-2.5} />
        <ProductLineImage imageName={imageNames[1]} singularName={singularName} width={10} top={0} left={-2.5} />
        <br />
        <ProductLineImage imageName={imageNames[2]} singularName={singularName} width={10} top={-2.5} left={0} />
        <ProductLineImage imageName={imageNames[3]} singularName={singularName} width={15} top={-5} left={0} />
      </div>
    </div>
  );
}
