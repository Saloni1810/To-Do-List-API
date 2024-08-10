import jwt from 'jsonwebtoken';
const jwtSecret = "#SecretJwtToken#0918"

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).redirect('api/login');
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        // console.log('Decoded token:', decoded); // Log decoded token
        
        req.user = decoded;
        console.log("User authenticated:", req.user);
        next();
    } catch (error) {
        console.error('Invalid token:', error); 
        res.status(401).redirect('api/login');
    }
};
