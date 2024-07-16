import { getMeta } from "~/view/shared/utilities/route-utilities";
import GalleryItemCard from "~/view/gallery/gallery-item-card";
import Gallery from "~/model/gallery/gallery";
import { Link, useLoaderData } from "@remix-run/react";
import * as RemixUtils from "~/model/shared/remix-utils";
import { redirectWithMessage } from "~/view/shared/utilities/message-banner";
import { ActionFunctionArgs } from "@remix-run/node";

export const meta = getMeta("Gallery", "View Sierpinski Shapes created by others!");

export default function Index() {
  //
  const galleryShapes = useLoaderData<typeof loader>();
  return (
    <>
      <p style={{ textAlign: "center" }}>
        There are over 16 billion Sierpinski&nbsp;Shapes!&nbsp;🫨 &nbsp; &nbsp; Here&nbsp;are&nbsp;some&nbsp;favorites...
      </p>
      <p style={{ textAlign: "center" }}>
        sort by:
        <span> &nbsp; </span>
        <Link to=".">yours</Link>
        <span> &nbsp;|&nbsp; </span>
        <Link to=".">liked</Link>
        <span> &nbsp;|&nbsp; </span>
        <Link to=".">recent</Link>
        <span> &nbsp;|&nbsp; </span>
        <Link to=".">random</Link>
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        {galleryShapes.map((shape) => (
          <GalleryItemCard key={shape.id} shape={shape} />
        ))}
      </div>
    </>
  );
}

export async function loader() {
  return Gallery.getGalleryShapes();
}

export async function action({ request }: ActionFunctionArgs) {
  //
  try {
    const formData = await request.formData();
    const shapeName = RemixUtils.getFormString(formData, "shape-name", "“untitled”");
    const name = RemixUtils.getFormString(formData, "your-name", "“anonymous”");
    const email = RemixUtils.getFormString(formData, "your-email-address", "");

    throw Error(
      `${shapeName} curated by ${name} ${
        email ? `(${email}) ` : ""
      }not added because this site doesn’t have a database yet`
    );
    //
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return redirectWithMessage(`/gallery`, `Adding to gallery failed — ${message}`);
  }
}
