import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const token = cookies.jwt;
    jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            next();
        }
    )
}

export default verifyJWT;