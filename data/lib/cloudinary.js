import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not set");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not set");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not set");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image) {
  //Converts the image to an ArrayBuffer, a low-level binary representation of the image data.
  const imageData = await image.arrayBuffer();
  // Extracts the MIME type (e.g., 'image/png', 'image/jpeg') of the image. This will be used in constructing the data URI.
  const mime = image.type;
  //Specifies the encoding type as base64.
  const encoding = "base64";
  // Converts the ArrayBuffer to a Node.js Buffer and then encodes it to a base64 string.
  const base64Data = Buffer.from(imageData).toString("base64");
  //Constructs a data URI, which is a base64-encoded string representing the image.
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
  // Uploads the base64-encoded image to Cloudinary. The upload method is called with the data URI and an options object specifying the folder to upload to.
  const result = await cloudinary.uploader.upload(fileUri, {
    folder: "nextjs-course-mutations",
  });
  // The result of the upload operation, which contains information about the uploaded image, including its URL.
  return result.secure_url;
}
