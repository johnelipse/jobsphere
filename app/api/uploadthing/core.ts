import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  fileUploader: f({
    pdf: {
      maxFileCount: 1,
      maxFileSize: "4MB",
    },
  })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId");

      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "john" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
