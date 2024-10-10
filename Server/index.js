// const express=require('express')
// const mongoose=require('mongoose')
// const cors=require('cors')
// const TodoModel =require('./Models/Todo')

// const app=express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/test')

// app.get('/get',(req,res) =>{
//     TodoModel.find()
//     .then(result =>res.json(result))
//     .catch(err =>res.json(err))
// })

// app.post('/add',(req,res)=>{
//     const task=req.body.task;
//     TodoModel.create({
//         task : task
//     }).then(result =>res.json(result))
//     .catch(err =>res.json(err))
// })
// app.put('/update/:id',(req,res)=>{
//     const {id}=req.params;
//     TodoModel.findByIdAndUpdate({_id : id},{done : true})
//     .then(result=>res.json(result))
//     .catch(err=>res.json(err))
// })
// app.delete('/delete/:id',(req, res)=>{
//     const {id}=req.params;
//     TodoModel.findByIdAndDelete({_id:id})
//     .then(result=>res.json(result))
//     .catch(err=>res.json(err))
// })

// app.listen(7001,()=>{
//     console.log("Server is Running");
    
// })

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

app.get('/get', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve todos." });
    }
});

app.post('/add', async (req, res) => {
    const { task } = req.body;

    try {
        const newTodo = await TodoModel.create({ task });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: "Failed to add todo." });
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done: true }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: "Failed to update todo." });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found." });
        }
        res.json(deletedTodo);
    } catch (err) {
        res.status(400).json({ message: "Failed to delete todo." });
    }
});

app.listen(7001, () => {
    console.log("Server is Running on port 7001");
});
