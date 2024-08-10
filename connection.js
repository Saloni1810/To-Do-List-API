import mongoose from 'mongoose';

async function connectMongoDb(url){

    return mongoose.connect(url)
    .then( ()=> console.log("MongoDB connected!!"))
    .catch((error) => console.log("ERRORR: " ,error))
}

export default connectMongoDb;