import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const jwtSecret = '#SecretJwtToken#0918';  // You should use an environment variable for this

export const signupPage = (req, res) => {
    res.render('signup');
};

export const loginPage = (req, res) => {
    res.render('login');
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        console.log("signup started");
        
        // const user = await User.create({ name, email, password})
        console.log("USer",user);
        
        await user.save();

        res.redirect('/api/login');
        console.log("signup done!!");
        
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
};

export const login = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        console.log(user);
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '48h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        console.log("login done!!");
        // res.render("home")
        res.redirect('/api/home');
    } catch (error) {
        console.error('Error in logging user:', error);
        res.status(500).send('Error logging in');
    }
};

export const logout = (req, res) => {
    try{
        res.clearCookie('token');
        res.redirect('/api/login');
        // res.render("login")
    }
    catch(error){
        console.error('Error in logout:', error);
    }
};
