import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "rahasia";

export const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Tokennya nda ada" });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};