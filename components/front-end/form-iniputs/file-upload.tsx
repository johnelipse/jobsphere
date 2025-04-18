import { UploadButton } from "@/lib/uploadthing";
import { toast } from "@mosespace/toast";
import { XCircle } from "lucide-react";
import React from "react";
import { FaFilePdf, FaFileAlt } from "react-icons/fa";

type MultipleImageInputProps = {
  label: string;
  file: string;
  setFile: any;
  className?: string;
  endpoint?: any;
};
export type FileProps = {
  title: string;
  type: string;
  size: number;
  url: string;
};
export function getFileIcon(extension: string | undefined) {
  switch (extension) {
    case "pdf":
      return <FaFilePdf className="w-6 h-6 flex-shrink-0 mr-2 text-red-500" />;

    default:
      return <FaFileAlt className="w-6 h-6 flex-shrink-0 mr-2 text-gray-500" />; // Default icon for other file types
  }
}
export default function FileUpload({
  label,
  file,
  setFile,
  className = "col-span-full",
  endpoint = "",
}: MultipleImageInputProps) {
  function handleImageRemove() {
    setFile("");
  }

  //   const extension = file?.title.split(".").pop();

  // Function to select the correct icon based on file extension
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </label>
        {/* {files && (
          <button
            onClick={() => setFiles([])}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Files</span>
          </button>
        )} */}
      </div>
      {file ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          <div className="relative mb-6">
            <button
              type="button"
              onClick={() => handleImageRemove()}
              className="absolute -top-4 -right-2 bg-slate-100 text-red-600 rounded-full "
            >
              <XCircle className="" />
            </button>
            <div className="py-2 rounded-md px-6 bg-white dark:bg-slate-800 text-slate-800 flex items-center dark:text-slate-200 border border-slate-200">
              <FaFilePdf className="w-6 h-6 flex-shrink-0 mr-2 text-red-500" />
              {/* <div className="flex flex-col">
                <span className="line-clamp-1">{file.title}</span>
                {file.size > 0 && (
                  <span className="text-xs">
                    {(file.size / 1000).toFixed(2)} kb
                  </span>
                )}
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <UploadButton
          className="ut-allowed-content:hidden"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setFile(res[0].ufsUrl);
            console.log(res);
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            toast.error("error", "File Upload Failed, Try Again");
            console.log(`ERROR! ${error.message}`, error);
          }}
        />
      )}
    </div>
  );
}
