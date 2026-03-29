import express from 'express';
import { Project } from '../models/project.model.js';
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const projectrouter = express.Router();

// Get all projects (Public)
projectrouter.get('/', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.send({ count: projects.length, data: projects });
    } catch (err) {
        res.status(400).send({ message: "Something went wrong!", error: err.message });
    }
});

// Get single project (Public)
projectrouter.get('/:id', async (req, res) => {
    try {
        const response = await Project.findById(req.params.id);
        if (!response) return res.status(404).send({ message: "Project not found" });
        res.send(response);
    } catch (err) {
        res.status(400).send({ message: "Something went wrong!" });
    }
});

// Create project (Admin Only)
projectrouter.post('/', protect, adminOnly, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).send({ message: "Title and content are required" });

        const project = new Project(req.body);
        const response = await project.save();
        
        // Wrap in a data object to match your Editor logic
        res.status(201).send({ data: response });
    } catch (err) {
        res.status(400).send({ message: "Failed to create project", error: err.message });
    }
});

// Update project (Admin Only)
projectrouter.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const response = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(response);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// Publish project (Admin Only)
projectrouter.patch("/:id/publish", protect, adminOnly, async (req, res) => {
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

// Delete project (Admin Only)
projectrouter.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.send("success!");
    } catch (err) {
        res.status(400).send({ message: "Something went wrong!" });
    }
});

export default projectrouter;
