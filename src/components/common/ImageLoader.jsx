"use client";

import { ICON_ASSETS } from "@/src/utils/assets";

export const FileLoader = (link) => {
  try {
    if (!link) return ICON_ASSETS.PROFILE_IMAGE_PLACEHOLDER_ICON;
    if (link?.toLocaleLowerCase().startsWith("http")) return link;
    if (link?.toLocaleLowerCase().startsWith("data:")) return link;

    const token = JSON.parse(localStorage.getItem("token"));
    const filename = link.split('/').pop();

    return `${process.env.NEXT_PUBLIC_BASE_API_URL}/file/${filename}?token=${token}`;
  } catch (error) {
    console.error(`Error in FileLoader: ${error}`);
    return ICON_ASSETS.PROFILE_IMAGE_PLACEHOLDER_ICON;
  }
}

const ImageLoader = (props) => {
  return (
    <img
      style={{ userSelect: "none" }}
      src={FileLoader(props?.source)}
      onError={(e) => e.target.src = ICON_ASSETS.PROFILE_IMAGE_PLACEHOLDER_ICON}
      {...props}
    />
  )
}

export default ImageLoader