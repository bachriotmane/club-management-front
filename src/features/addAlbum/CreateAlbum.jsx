import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../auth/axios";
import FileUpload from "../../shared/components/utili/FileUpload";
import { useMutation } from "@tanstack/react-query";
import { IoMdArrowBack } from "react-icons/io";
const CreateAlbum = () => {
  const {clubId} =useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleFilesChange = (selectedFiles) => {
    setImages(selectedFiles);
  };

  const { mutate: createAlbum, isPending} = useMutation({
    mutationFn: (album) => axiosInstance.post(`/album/${clubId}`, album, { 
      headers: {
          "Content-Type": "multipart/form-data",
        },
     }),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("location", location);
    formData.append("title", title);
    formData.append("date", date);
    createAlbum(formData)

    setImages([]);
    setLocation("");
    setTitle("");
    setDate("");
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" mb-6 font-semibold text-gray-800">
        <button onClick={()=>navigate(-1)}>
          <IoMdArrowBack className="text-btnColor text-3xl"/>
        </button>
        <div className="w-full flex justify-center underline">Add New Album</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          
        <div >
            <label className="block text-gray-700 pl-1">Titre <span className="text-red-600">*</span></label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border outline-none focus:border-btnColor p-2 w-full rounded-lg"
              placeholder="Enter album titre"
              required
            ></input>
          </div>

          <div>
            <label className="block text-gray-700 pl-1">Location <span className="text-red-600">*</span></label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border outline-none focus:border-btnColor p-2 w-full rounded-lg"
              placeholder="Enter album location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 pl-1">Date <span className="text-red-600">*</span></label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border outline-none focus:border-btnColor p-2 w-full rounded-lg bg-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 pl-1">Upload image<span className="text-red-600">*</span></label>
            <FileUpload onFilesChange={handleFilesChange} />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-btnColor text-white py-2 px-4 rounded-lg"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Add Album"}
          </button>
        </div>
        
      </form> 
    </div>
  );
};

export default CreateAlbum;
