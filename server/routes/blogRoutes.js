import express from "express"  ;
import { Blog } from "../models/blog.model.js";

const router = express.Router();


//get all blogs
router.get('/get-all-blogs', async (req, res) => {
  try{
    const blogs = await Blog.find({});
    res.send({count:blogs.length, data:blogs});
  }catch(err){
    console.log(err)
    res.status(400).send({
            message: "something went wrong!",
            error: err.message
        });
  }
});

//get single blog
router.get('/blog/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const response = await Blog.findById(id);
        console.group(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message:"something went wrong!"});
    }
})

//update a blog
router.put('/blog/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        const response = await Blog.findByIdAndUpdate(id, data,{returnOriginal:false});
        console.group(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message:"something went wrong!"});
    }
})

//delete blog
router.delete('/blog/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        const response = await Blog.findByIdAndDelete(id);
        console.log(response);
        res.send("success!");
    }catch(err){
        console.log(err);
        res.status(400).send({message:"something went wrong!"});
    }
})
//create blog
router.post('/create-blog', async (req,res)=>{
    try{
        const data = req.body;
        const blog = new Blog(data)
        const response = await blog.save();
        console.log(response);
        res.send(response);
    }catch(err){
        console.error("Mongoose Error:", err); 
        res.status(400).send({
            message: "something went wrong!",
            error: err.message
        });
    }
})

export default router;