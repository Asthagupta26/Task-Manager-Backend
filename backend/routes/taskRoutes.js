const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

//Create a task -api

router.post("/tasks",async(req,res)=>{
    try{
        const task = new Task(req.body)
        await task.save()
        res.status(201).json(task)
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
});

//getting all the task
router.get("/tasks",async (req,res)=>{
    try{
        const tasks = await Task.find()
        res.status(200).json(tasks)
    }
    catch(error){
        res.status(500).json({message:"server error"});

    }
})

//Get a specific task
router.get("/tasks/:id",async (req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            });
        }
        res.status(200).json(task)
    }
    catch(error){
        res.status(500).json({message:"server error"});

    }
})

// Update a task
router.put("/tasks/:id", async (req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true,

        });
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json(task);
    }
    catch(error){
        res.status(500).json({message:"server error"})
    }
});

// Delete a Task
router.delete("/tasks/:id",async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }
        res.status(200).json({message:"Task Deleted"});
    }
    catch(error){
        res.status(500).json({message:"Server error"})
    }
    
});

module.exports= router;

