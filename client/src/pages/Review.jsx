import React, { useState } from "react";
import { FileText } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const ReviewResume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload a resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      const { data } = await axios.post(
        "/api/ai/resume-review",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success("Resume reviewed successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to review resume"
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
          <FileText className="w-5 h-5 text-emerald-500" />
          <h1 className="text-xl font-semibold">
            Resume Review
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">
          Upload Resume
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          className="w-full mt-2 text-sm border border-gray-300 rounded-md p-2"
          required
        />

        <p className="mt-2 text-xs text-gray-400">
          Supports PDF, DOC and DOCX formats
        </p>

        <button
          disabled={loading}
          type="submit"
          className="w-full mt-6 flex justify-center items-center gap-2 py-2 rounded-lg text-white bg-gradient-to-r from-green-400 to-cyan-500 disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          {loading ? "Reviewing..." : "Review Resume"}
        </button>
      </form>

      {/* Right Panel */}
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg p-5 flex flex-col min-h-[500px]">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-emerald-500" />
          <h1 className="text-xl font-semibold">
            Analysis Results
          </h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          {content ? (
            <div className="w-full overflow-y-auto p-4">
              <pre className="whitespace-pre-wrap text-sm">
                {content}
              </pre>
            </div>
          ) : resume ? (
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="font-medium text-lg">
                {resume.name}
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Resume uploaded successfully
              </p>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              <p>
                Upload your resume and click
                <br />
                "Review Resume" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;