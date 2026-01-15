import express from 'express';
import { Project } from '../models/project.model.js';

const projectrouter = express.Router();

//get all projects
projectrouter.get('/project', async (req, res) => {
    try{
        const projects = await Project.find({});
        res.send({count:projects.length, data:projects});
    }catch(err){
        console.log(err)
        res.status(400).send({
            message: "something went wrong!",
            error: err.message
        });
    }
});

//get single project
projectrouter.get('/project/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const response = await Project.findById(id);
        console.group(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message: "something went wrong!"});
    }
});

//update a project
projectrouter.put('/project/:id', async(req, res) =>{
    try{
        const id = req.params.id;
        const data = req.body;
        const response = await Project.findByIdAndUpdate(id, data, { new : true});
        console.log(response);
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({message:"something went wrong!"});
    }
});

//delete project
projectrouter.delete('/project/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const response = await Project.findByIdAndDelete(id);
        console.log(response);
        res.send("success!");
    }catch(err){
        console.log(err);
        res.status(400).send({message: "something went wrong!"});
    }
});

//create blog
// Example improvement for your routes
    projectrouter.post('/project', async (req, res) => {
    try {
        const data = req.body;
        
        // Validation
        if (!data.title || !data.content) {
            return res.status(400).send({
                message: "Title and content are required"
            });
        }
        
        const project = new Project(data);
        const response = await project.save();
        
        res.status(201).send({
            message: "Project created successfully",
            data: response
        });
    } catch (err) {
        console.error("Mongoose Error:", err);
        res.status(400).send({
            message: "Failed to create project",
            error: err.message
        });
    }
});

projectrouter.patch("/project/:id/publish", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: "published" },
      { new: true }
    );
    res.send(project);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


export default projectrouter;

