import React, { useState } from "react";
import { Hash } from "lucide-react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const BlogTitles = () => {
  const categories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [input , setInput] = useState("");
  const[loading, setLoading] = useState(false)
  const[content, setContent] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const prompt = `Generate 5 catchy and SEO-friendly blog titles about ${keyword} in the category of ${selectedCategory}. The titles should be engaging and relevant to the topic.`;
      const {data} = await axios.post("/api/ai/generate-blog-title",{
        prompt
      });
      if(data.success){
        setContent(data.content);
      }else{
        toast.error("Failed to generate blog titles" , data.message);
      }
    }catch(error){
      console.log(error);
    }

    // API Call
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex flex-wrap gap-4 text-slate-700">

      {/* Left Panel */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-5 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#9333EA]" />
          <h1 className="text-xl font-semibold">
            AI Title Generator
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">
          Keyword
        </p>

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="The future of artificial intelligence"
          className="w-full mt-2 p-2 px-3 border border-gray-300 rounded-md outline-none text-sm"
          required
        />

        <p className="mt-6 text-sm font-medium">
          Category
        </p>

        <div className="mt-3 flex flex-wrap gap-3">
          {categories.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setSelectedCategory(item)}
              className={`px-4 py-1 text-sm rounded-full border transition ${
                selectedCategory === item
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-8 flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white py-2 rounded-lg"
        >
          <Hash className="w-4 h-4" />
          Generate Title
        </button>
      </form>

      {/* Right Panel */}
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg p-5 flex flex-col min-h-[500px]">

        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#9333EA]" />
          <h1 className="text-xl font-semibold">
            Generated Titles
          </h1>
        </div>
          {!content ? (<div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Hash className="w-10 h-10 mx-auto mb-4" />
            <p>
              Enter keywords and click
              "Generate Title" to get started
            </p>
          </div>
        </div>) : (<div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">{content}</div>)}
        

      </div> 

    </div>
  );
};

export default BlogTitles;