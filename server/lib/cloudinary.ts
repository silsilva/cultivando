import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dcpeev3uv",
  api_key: "518957364492378",
  api_secret: process.env.ALGOLIAKEY,
});

export { cloudinary };
