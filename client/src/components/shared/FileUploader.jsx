import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ id, setImage, imgSrc }) => {
  const [file, setFile] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      setImage(acceptedFiles[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      id={id}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {(file.length === 0 && imgSrc) || file.length > 0 ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              src={`${
                (file.length === 0 && imgSrc) || URL.createObjectURL(file[0])
              }`}
              alt="image"
              className="file_uploader-img"
            />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <button
            type="button"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 shad-button_dark_4"
          >
            Select from computer
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
