import { ChildRotations } from "~/components/sierpinski-shape/sierpinski-utilities";
import SierpinskiShape from "~/components/sierpinski-shape/sierpinski-shape";
import { getMeta } from "~/model/utility/route-utilities";

export const meta = getMeta("Gallery", "View Sierpinski Shapes created by others!");

export default function Index() {
  //
  const maxIterations = 7;
  const size = 256;
  const standardRotations: ChildRotations = [0, null, 0, 0];
  const educationalRotations: ChildRotations = [90, null, 0, 0];
  const interestingRotations: ChildRotations = [180, null, 180, 270];
  const carpetRotations: ChildRotations = [180, 90, 180, 270];
  const messyRotations: ChildRotations = [167, 52, null, 294];

  const sierpinskiShapes = [];
  for (let i = 0; i <= maxIterations; i++) {
    sierpinskiShapes.push(
      <tr key={i}>
        <td style={{ verticalAlign: "middle", paddingBottom: "40px", textAlign: "right" }}>{i}:</td>
        <td>
          <SierpinskiShape
            iterationCount={i}
            size={size}
            childRotations={standardRotations}
            idPrefix={`standard${i}`}
          />
        </td>
        <td>
          <SierpinskiShape
            iterationCount={i}
            size={size}
            childRotations={educationalRotations}
            idPrefix={`educational${i}`}
          />
        </td>
        <td>
          <SierpinskiShape
            iterationCount={i}
            size={size}
            childRotations={interestingRotations}
            idPrefix={`interesting${i}`}
          />
        </td>
        <td>
          <SierpinskiShape iterationCount={i} size={size} childRotations={carpetRotations} idPrefix={`carpet${i}`} />
        </td>
        <td>
          <SierpinskiShape iterationCount={i} size={size} childRotations={messyRotations} idPrefix={`messy${i}`} />
        </td>
      </tr>
    );
  }
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <table>
        <thead>
          <th>stage</th>
          <th>standard Sierpinski Triangle</th>
          <th>simple one-triangle rotation</th>
          <th>rotating all the triangles</th>
          <th>including the fourth quadrant</th>
          <th>rotations other than 90, 180, 270</th>
        </thead>
        <tbody>{sierpinskiShapes}</tbody>
      </table>
    </div>
  );
}
