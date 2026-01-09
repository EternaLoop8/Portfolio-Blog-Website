import mongoose from "mongoose";

const{Schema} = mongoose;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }

}, {timestamps:true});

export const Blog = mongoose.model("blog", blogSchema);