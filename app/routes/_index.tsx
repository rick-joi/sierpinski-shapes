import type { MetaFunction } from "@remix-run/node";
import { ChildRotations } from "~/components/sierpinski-utilities";
import SierpinskiShape from "~/components/sierpinski-shape";

export const meta: MetaFunction = () => {
  return [{ title: "Sierpinski Shapes" }, { name: "description", content: "Create your own Sierpinski Shape!" }];
};

export default function Index() {
  const sierpinskiShapes = [];
  const maxIterations = 7;
  const size = 256;
  const standardRotations: ChildRotations = [0, null, 0, 0];
  const educationalRotations: ChildRotations = [90, null, 0, 0];
  const interestingRotations: ChildRotations = [180, null, 180, 270];
  const carpetRotations: ChildRotations = [180, 90, 180, 270];
  const messyRotations: ChildRotations = [167, 52, null, 294];
  for (let i = 0; i <= maxIterations; i++) {
    sierpinskiShapes.push(
      <div key={i}>
        <SierpinskiShape iterationCount={i} size={size} childRotations={standardRotations} idPrefix={`standard${i}`} />
        <SierpinskiShape
          iterationCount={i}
          size={size}
          childRotations={educationalRotations}
          idPrefix={`educational${i}`}
        />
        <SierpinskiShape
          iterationCount={i}
          size={size}
          childRotations={interestingRotations}
          idPrefix={`interesting${i}`}
        />
        <SierpinskiShape iterationCount={i} size={size} childRotations={carpetRotations} idPrefix={`carpet${i}`} />
        <SierpinskiShape iterationCount={i} size={size} childRotations={messyRotations} idPrefix={`messy${i}`} />
      </div>
    );
  }
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Sierpinski Shapes</h1>
      <p>Coming soon...</p>
      {sierpinskiShapes}
    </div>
  );
}
