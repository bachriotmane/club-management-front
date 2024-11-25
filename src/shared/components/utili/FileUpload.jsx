import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

// eslint-disable-next-line react/prop-types
const FileUpload = ({ onFilesChange }) => {
    const [files, setFiles] = useState([]);
  
    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files).filter(file =>
        file.type.startsWith("image/")
      );
      const updatedFiles = [...files, ...selectedFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    };
  
    const handleRemoveFile = (index) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
        file.type.startsWith("image/")
      );
      const updatedFiles = [...files, ...droppedFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    return (
      <div className="container mx-auto ">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full border-2 border-dashed border-gray-400 rounded-lg  text-center cursor-pointer"
        >
          <p className="text-gray-500">Drag and Drop or</p>
          <label
            htmlFor="fileInput"
            className="text-blue-500 cursor-pointer"
          >
            Choose an Image File
          </label>
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
  
        {/* Selected Files Preview */}
        {files.length > 0 && (
          <div className="mt-2 flex gap-4 flex-wrap">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 p-1 gap-2 rounded-md shadow-md"
              >
                <p className="text-sm truncate">{file.name}</p>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  <RxCross2 className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default FileUpload;
  