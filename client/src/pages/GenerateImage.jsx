import React, { useState } from "react";
import { ImageIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const GenerateImages = () => {
  const styles = [
    "Realistic",
    "Ghibli Style",
    "Anime Style",
    "Pixel Art",
    "3D Render",
  ];

  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const finalPrompt = `Generate an image in ${selectedStyle} style based on the following description: ${prompt}`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        {
          prompt: finalPrompt,
          publish: false,
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Image generated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate image"
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
          <ImageIcon className="w-5 h-5 text-green-500" />
          <h1 className="text-xl font-semibold">
            AI Image Generator
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">
          Describe Your Image
        </p>

        <textarea
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to see in the image..."
          className="w-full mt-2 p-3 border border-gray-300 rounded-md outline-none text-sm resize-none"
          required
        />

        <p className="mt-6 text-sm font-medium">
          Style
        </p>

        <div className="mt-3 flex gap-3 flex-wrap">
          {styles.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedStyle(item)}
              className={`px-4 py-1 text-sm border rounded-full cursor-pointer transition ${
                selectedStyle === item
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full mt-8 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {/* Right Panel */}
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg p-5 flex flex-col min-h-[500px]">

        <div className="flex items-center gap-3">
          <ImageIcon className="w-5 h-5 text-green-500" />
          <h1 className="text-xl font-semibold">
            Generated Image
          </h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center text-gray-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-4" />
              <p>
                Describe an image and click
                <br />
                "Generate Image" to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex-1 flex items-center justify-center">
            <img
              src={content}
              alt="Generated"
              className="max-w-full rounded-lg shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;