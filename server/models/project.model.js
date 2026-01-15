import mongoose from "mongoose";

const{Schema} = mongoose;

const projectSchema = new Schema(
   {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String, // TipTap HTML
      required: true,
    },
    techStack: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("project", projectSchema);