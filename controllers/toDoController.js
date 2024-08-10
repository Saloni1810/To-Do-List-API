import ToDo from "../models/toDo.js";


async function createToDO(req, res){

    try{
        const { taskName, description, dueDate, status } = req.body;
        const createdBy = req.user.userId;

        ToDo.collection.dropIndex('taskNum_1', (err, result) => {
            if (err) {
                console.error('Error dropping index:', err);
            } else {
                console.log('Index dropped:', result);
            }
        });
        
        // Find the highest taskNum for the user
        const lastTask = await ToDo.findOne({ createdBy })
            .sort({ taskNum: -1 });

        // Set taskNum based on lastTask
        const taskNum = lastTask ? lastTask.taskNum + 1 : 1;
        console.log(taskNum);
        
        // Create and save new task
        const toDo = new ToDo({
            taskNum,
            taskName,
            description,
            dueDate,
            status,
            createdBy
        });

        await toDo.save();

        return res.redirect("/api");

    }
    catch(error){
        console.error('Error adding task:', error);
        res.status(500).json({error: error.message })
    }
    
}

async function readToDO(req, res){

    try{
        const body = req.body;
        // console.log("req.user in readtodo" ,req.user);
        
        const alltodos = await ToDo.find({ createdBy : req.user.userId })

        // console.log("all todosd" ,alltodos);
        // return res.render("home", {todos : alltodos})
        return res.redirect("/api")

    } 
    catch(error){
        res.status(500).json({error: error.message })
    }
    
}

async function  updateToDO(req, res){
        const {taskNum} = req.params;
        const updatedData = req.body;
        console.log("updated" ,updatedData);
        
        // Remove empty fields to avoid unintentional updates
        if (!updatedData.dueDate) {
            delete updatedData.dueDate;
        }
       try {
        const updatedToDo = await ToDo.findOneAndUpdate(
            { taskNum, createdBy: req.user.userId },
            { $set: updatedData },
            { new: true }
        );
        console.log("Updates to do" ,updateToDO);
        
        if (!updatedToDo) {
            return res.status(404).send('Task not found');
        }
        // res.render("home")
        // res.status(200).send('Task updated successfully');
        // res.redirect("/api")
        res.status(200).json(updatedToDo);
        
    } catch (error) {
        res.status(500).send('Error updating task');
    }
    
}

async function deleteToDO(req, res){
    const {taskNum} = req.params;
    console.log(req.user);
    console.log("Deleting ToDo with taskNum:", req.params.taskNum);
   try {
    const deletedToDo = await ToDo.findOneAndDelete(
        { taskNum, createdBy: req.user.userId},
    );
    if (!deletedToDo) {
        return res.status(404).send('Task not found');
    }

    // res.redirect("api/home")
    // res.render("home")
    res.redirect("/api")
    // res.status(200).send('Task deleted successfully');
} catch (error) {
    res.status(500).send('Error deleteing task');
}

}





export {createToDO, readToDO, updateToDO, deleteToDO}