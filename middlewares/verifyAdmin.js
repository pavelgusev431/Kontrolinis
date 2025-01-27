import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAdmin = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const token = cookies.jwt;
    jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(decoded.role == "admin" && !err) {
                next();
            } 
            else res.sendStatus(403);
        }
    )
}

export default verifyAdmin;