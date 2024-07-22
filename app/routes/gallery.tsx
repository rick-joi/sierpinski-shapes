import { useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";

import { getMeta } from "~/view/_shared/miscellaneous/utilities/route-utilities";
import { redirectWithMessage } from "~/view/_shared/miscellaneous/utilities/redirect-utilities";
import * as FormUtils from "~/view/_shared/forms/form-utils";

import GalleryItemCard from "~/view/gallery/gallery-item-card";

import Gallery from "~/model/gallery/gallery";

export const meta = getMeta("Gallery", "View Sierpinski Shapes created by others!");

export default function GalleryRoute() {
  //
  const galleryShapes = useLoaderData<typeof loader>();

  return (
    <div>
      <p style={{ textAlign: "center" }}>
        There are over 16 billion Sierpinski&nbsp;Shapes!&nbsp;🫨 &nbsp; &nbsp; Here&nbsp;are&nbsp;some&nbsp;favorites...
      </p>
      {/* <p style={{ textAlign: "center" }}>
        sort by:
        <span> &nbsp; </span>
        <Link to=".">yours</Link> -- add this one after they like or create one, and default to this as the primary search
        <span> &nbsp;|&nbsp; </span>
        <Link to=".">liked</Link>
        <span> &nbsp;|&nbsp; </span>
        <Link to=".">recent</Link>
        <span> &nbsp;|&nbsp; </span>
        <Link to=".">random</Link>
      </p> */}
      <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap", justifyContent: "center" }}>
        {galleryShapes.map((shape) => (
          <GalleryItemCard key={shape.id} shape={shape} />
        ))}
      </div>
    </div>
  );
}

export async function loader() {
  return Gallery.getGalleryShapes();
}

export async function action({ request }: ActionFunctionArgs) {
  //
  try {
    const formData = await request.formData();
    const shapeName = FormUtils.getFormString(formData, "shape-name", "“untitled”");
    const name = FormUtils.getFormString(formData, "your-name", "“anonymous”");
    const email = FormUtils.getFormString(formData, "your-email-address", "");

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
