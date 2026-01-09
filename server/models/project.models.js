import mongoose from "mongoose";

const{Schema} = mongoose;

const projectSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    techStack: [{type: String}],
    description:{
        type:String,
        required:true
    },

}, {timestamps:true});

export const Project = mongoose.model("project", projectSchema);