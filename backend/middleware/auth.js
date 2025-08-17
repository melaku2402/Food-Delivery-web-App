
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized, Login again" });
    }
        
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user ID to the request body
        req.body.userId= token_decode.id;
        
        
        
        // Pass control to the next function (the route handler)
        next();
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Invalid or expired token" });
    }
}

export default authMiddleware;