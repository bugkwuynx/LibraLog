import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
};

export default auth;
