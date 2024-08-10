import express from 'express';
import ToDo from '../models/toDo.js';
import { authMiddleware } from '../middlewears/authMiddlewear.js';
import { createToDO, readToDO, updateToDO, deleteToDO } from '../controllers/toDoController.js';
const router = express.Router();

//default page
router.get("/", authMiddleware, async(req,res)=>{

    console.log("Req user",req.user);
    
    if(!req.user) return res.redirect("/login")
    const allToDos = await ToDo.find({ createdBy : req.user.userId })
    // const todos = await ToDo.find({ createdBy: req.user.userId });
        
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-GB', options);

    const todosDueToday = allToDos.filter(todo => {
        const formattedDueDate = new Date(todo.dueDate).toLocaleDateString('en-GB', options);
        return formattedDueDate === today && todo.status!== "Completed";
    });
    
    return res.render("home", {
        todos : allToDos,
        todosDueToday: todosDueToday
    })
})

//get all tasks
router.get("/home", authMiddleware, readToDO )

//create new task 
router.post("/todos", authMiddleware, createToDO )

//update a task
router.patch("/update/:taskNum", authMiddleware, updateToDO)

//delete a task
router.get("/todos/:taskNum", authMiddleware, deleteToDO )

//Filtering tasks
router.get('/filter', authMiddleware,async (req, res) => {
    try {
        const { taskName, status, dueDate } = req.query;
        console.log(req.user);
        
        const filterCriteria = { createdBy : req.user.userId};

        if (taskName) filterCriteria.taskName = new RegExp(taskName, 'i'); // case-insensitive search
        if (status) filterCriteria.status = status;
        if (dueDate) filterCriteria.dueDate = dueDate;

        const todos = await ToDo.find(filterCriteria);  
        console.log("Filtering done", todos);
        
        res.json(todos)
        // res.render('todos', { todos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/api/todos',authMiddleware, async (req, res) => {
    try {
        const todos = await ToDo.find({ createdBy: req.user.userId });
        
        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
        
        
        const todosDueToday = todos.filter(todo => todo.dueDate === today);

        res.render('home', { todos, todosDueToday });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
