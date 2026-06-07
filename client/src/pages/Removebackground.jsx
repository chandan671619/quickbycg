import React, { useState } from "react";
import { Eraser } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const RemoveBackground = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        "/api/ai/remove-background",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Background removed successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove background"
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
          <Eraser className="w-5 h-5 text-orange-500" />
          <h1 className="text-xl font-semibold">
            Background Removal
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">
          Upload Image
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mt-2 text-sm border border-gray-300 rounded-md p-2"
          required
        />

        <p className="mt-2 text-xs text-gray-400">
          Supports JPG, PNG and other image formats
        </p>

        <button
          disabled={loading}
          type="submit"
          className="w-full mt-6 flex items-center justify-center gap-2 py-2 rounded-lg text-white bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-50"
        >
          <Eraser className="w-4 h-4" />
          {loading ? "Processing..." : "Remove Background"}
        </button>
      </form>

      {/* Right Panel */}
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg p-5 flex flex-col min-h-[500px]">

        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-orange-500" />
          <h1 className="text-xl font-semibold">
            Processed Image
          </h1>
        </div>

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
              <Eraser className="w-12 h-12 mx-auto mb-4" />
              <p>
                Upload an image and click
                <br />
                "Remove Background" to get started
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default RemoveBackground;