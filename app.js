import 'dotenv/config';
import express from 'express';
import authRoutes from "./routes/authRoutes.js"
import toDoRoutes from "./routes/toDoRoutes.js"
import configureMiddleware from "./middlewears/middlewear.js"
import connectMongoDb from "./connection.js"
import path from "path";
import methodOverride from 'method-override';

const app = express();
const PORT = process.env.PORT || 8001;

//connection
connectMongoDb(process.env.MONGO_URL )
app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        console.log("Method Override: ", req.body._method);
        return req.body._method;
    }
    return null;
}));
//middlewear
configureMiddleware(app);

//set the view engine to ejs
app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"))

// Routes
app.use('/api', authRoutes);
app.use('/api', toDoRoutes);
app.use("/", toDoRoutes)



app.listen(PORT, ()=> console.log(`Server started at port : ${PORT}`));