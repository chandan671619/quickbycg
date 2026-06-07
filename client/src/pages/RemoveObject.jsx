import React, { useState } from "react";
import { Scissors } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
 axios.defaults.baseURL =import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [objectText, setObjectText] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

    
  const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!image) {
    toast.error("Please select an image");
    return;
  }

  if (!objectText) {
    toast.error("Please enter object name");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("object", objectText);

    const { data } = await axios.post(
      "/api/ai/remove-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      setContent(data.content);
      toast.success("Object removed successfully");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Failed to remove object"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-4 text-slate-700">

      {/* Left Panel */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-5 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-blue-500" />
          <h1 className="text-xl font-semibold">
            Object Removal
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">
          Upload image
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mt-2 text-sm border border-gray-300 rounded-md p-2"
          required
        />

        <p className="mt-6 text-sm font-medium">
          Describe object to remove
        </p>

        <textarea
          rows={4}
          value={objectText}
          onChange={(e) => setObjectText(e.target.value)}
          placeholder="e.g., car in background, tree from the image"
          className="w-full mt-2 p-3 border border-gray-300 rounded-md outline-none text-sm resize-none"
          required
        />

        <p className="mt-2 text-xs text-gray-400">
          Be specific about what you want to remove
        </p>

        <button
          type="submit"
          className="w-full mt-6 flex justify-center items-center gap-2 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500"
        >
          <Scissors className="w-4 h-4" />
          Remove Object
        </button>
      </form>

      {/* Right Panel */}
      <div className="flex-1 flex justify-center items-center">
  {content ? (
    <img
      src={content}
      alt="Processed"
      className="max-h-80 rounded-lg"
    />
  ) : image ? (
    <img
      src={URL.createObjectURL(image)}
      alt="Preview"
      className="max-h-80 rounded-lg"
    />
  ) : (
    <div className="text-center text-gray-400">
      <Scissors className="w-12 h-12 mx-auto mb-4" />
      <p>
        Upload an image and describe
        <br />
        what to remove
      </p>
    </div>
  )}
</div>
    </div>
  );
};

export default RemoveObject;