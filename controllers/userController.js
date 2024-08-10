import User from "../models/users.js";
import {v4 as uuidv4} from "uuid"
import { setUser, getUser } from "../service/auth.js";

async function createUser(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })

    return res.redirect("/")
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
        password
    })
    if(!user){
        return res.render("login" , {
            error:"Invalid username or password"
    }) 
}
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId)
    return res.redirect("/");
}

export {createUser, handleUserLogin}