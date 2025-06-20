import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, "secretkeyofnoteapp1234@#"); // Verify the token
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        const user = await User.findById({_id : decoded.id}); // Find user by ID from token
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newUser = { name: user.name, id: user._id };
req.user = newUser; // Attach only name and id to request object
next();// Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in middleware:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}

export default middleware;
