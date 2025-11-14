import { UTApi, createUploadthing } from "uploadthing/server";
const f = createUploadthing();
const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "8MB",
      maxFileCount: 1
    }
  }).middleware(async () => {
    return { userId: "Admin" };
  }).onUploadError(async ({ error }) => {
    console.error(error.message);
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete for userId:", metadata.userId);
    console.log("file url", file.ufsUrl);
    return { uploadedBy: metadata.userId };
  })
};
const utapi = new UTApi();
export {
  uploadRouter as a,
  utapi as u
};
