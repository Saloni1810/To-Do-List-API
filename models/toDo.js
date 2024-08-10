import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
const Schema = mongoose.Schema;
// Initialize the AutoIncrement plugin
// const AutoIncrement = mongooseSequence(mongoose);

const toDoSchema = mongoose.Schema({
    taskNum : {
        type: Number,
        required: true,
       
    },
    taskName : {
        type: String,
        required : true,
    },
    description : {
        type: String 
    },
    status : {
        type: String,
        required: true 
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: "users",   
        required: true
    },
    dueDate : {
        type: Date,
        required : true,
    }
},
{ timestamps: true})

// Apply auto-increment plugin to taskNum
// toDoSchema.plugin(AutoIncrement, { inc_field: 'taskNum' });

// Pre-save middleware to increment taskNum
// toDoSchema.pre('save', async function(next) {
//     console.log("entered pre save");
    
//     const doc = this;
//     if (doc.isNew) {  // Only increment if it's a new document
//         console.log('Middleware triggered for new task');
        
//         const lastTask = await ToDo.findOne({ createdBy: doc.createdBy })
//             .sort({ taskNum: -1 }); // Sort by taskNum in descending order

//         doc.taskNum = lastTask ? lastTask.taskNum + 1 : 1;
        
//         console.log('Assigned taskNum:', doc.taskNum);
//     }
//     else{
//         console.log("doc is not new");
        
//     }
//     next();
// });

// toDoSchema.pre('save', function(next) {
//     console.log("Simple middleware is running");
//     next();
// });

toDoSchema.index({ createdBy: 1, taskNum: 1 }, { unique: true });

const ToDo = mongoose.model("toDoList", toDoSchema);

export default ToDo;