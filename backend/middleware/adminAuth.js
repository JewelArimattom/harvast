import jwt from "jsonwebtoken";
const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized access required 1" });
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ success: false, message: "Unauthorized 2" });
        }
        next();
    } 
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default adminAuth;