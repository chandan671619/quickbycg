import OpenAI from "openai";
import sql from "../configs/db.js";
import axios from "axios";
import {cloudinary} from "../configs/cloudinary.js";
import FormData from "form-data";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generateArticle = async (req, res) => {
  try {
     console.log("generateArticle called");
    const userId = "test-user";

    const { prompt, length } = req.body;

    const response = await AI.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "user",
      content: `Write a professional SEO-friendly article about ${prompt}`,
    },
  ],
  temperature: 0.7,
  max_tokens: 2000,
});

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Blogtitle = async (req, res) => {
  try {
     console.log("Blogtitle called");
    const userId = "test-user";

    const { prompt } = req.body;

    const response = await AI.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "user",
      content: `Write a professional SEO-friendly article about ${prompt}`,
    },
  ],
  temperature: 0.7,
  max_tokens: 2000,
});

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const generateimage = async (req, res) => {
  try {
    console.log("generateimage called");

    const userId = "test-user";

    const { prompt, publish } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }
    console.log("API KEY:", process.env.CLIPDROP_API_KEY?.slice(0,10));

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data
    ).toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(
      base64Image,
      {
        folder: "quickai",
      }
    );

    const secure_url = uploadResponse.secure_url;
    

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (
        ${userId},
        ${prompt},
        ${secure_url},
        'image',
        ${publish ?? false}
      )
    `;

    return res.json({
      success: true,
      content: secure_url,
    });
  } catch (error) {
  console.log("Generate Image Error:");

  if (error.response) {
    console.log("Status:", error.response.status);

    console.log(
      "Response:",
      Buffer.from(error.response.data).toString()
    );
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}}

export const removebackground = async (req, res) => {
  try {
    console.log("removebackground called");
    console.log(req.file);

    const userId = "test-user";

    const  image  = req.file;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const { secure_url } = await cloudinary.uploader.upload(image.path, {
  transformation: [
    {
      effect: "background_removal",
      background_removal: "remove_the_background",
    },
  ],
});
    await sql`INSERT INTO creations (user_id, prompt, content, type)
  VALUES (${userId},'Remove background from image',${secure_url},'image')`;
    

    return res.json({
      success: true,
      content: secure_url,
    });
  } catch (error) {
  console.log("Generate Image Error:");

  if (error.response) {
    console.log("Status:", error.response.status);

    console.log(
      "Response:",
      Buffer.from(error.response.data).toString()
    );
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}}


export const removeImageObject = async (req, res) => {
  try {
    console.log("removebackground called");

    const userId = "test-user";
    const { object } = req.body;
    const  image  = req.file;
    console.log(image);
    console.log(object);

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const { public_id } = await cloudinary.uploader.upload(image.path);
    
    
  const imageUrl = cloudinary.url(public_id, {
  transformation: [
    {
      effect: `gen_remove:${object}`,
    },
  ],
  resource_type: "image",
});
await sql`
  INSERT INTO creations (user_id, prompt, content, type)
  VALUES (
    ${userId},
    ${`Removed ${object} from image`},
    ${imageUrl},
    'image'
  )
`;

    return res.json({
      success: true,
      content: imageUrl,
    });
  } catch (error) {
  console.log("Generate Image Error:");

  if (error.response) {
    console.log("Status:", error.response.status);

    console.log(
      "Response:",
      Buffer.from(error.response.data).toString()
    );
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}}

export const resumeReview = async (req, res) => {
  try {
    const userId = "test-user";

    const resume = req.file;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);

    const pdfData = await pdf(dataBuffer);

    const prompt = `
Review the following resume and provide constructive feedback.

Give:
1. Overall ATS Score (out of 100)
2. Strengths
3. Weaknesses
4. Missing Skills
5. Resume Improvements
6. Final Suggestions

Resume Content:

${pdfData.text}
`;

    const response = await AI.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations
      (user_id, prompt, content, type)
      VALUES
      (
        ${userId},
        ${"Review uploaded resume"},
        ${content},
        ${"resume-review"}
      )
    `;

    fs.unlinkSync(resume.path);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};