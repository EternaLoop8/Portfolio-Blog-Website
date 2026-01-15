import mongoose from "mongoose";

const{Schema} = mongoose;

const blogSchema = new Schema(
    {
    title: { type: String, required: true },
    subtitle: { type: String }, 
    content: { type: String, required: true },
    author: { type: String, default: "Admin" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("blog", blogSchema);