import User from "../models/authModel.js";
import sha1 from "js-sha1";
import sha256 from "js-sha256";
import jsonwebtoken from "jsonwebtoken";

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = sha256(sha1(password));
    const role = "user";
    const foundUser = await User.findOne({ where: { username: username } });
    if (foundUser) {
        res.status(403).json({
            status: "fail",
            message: `User ${username} already exists`,
        });
        return;
    }
    else {
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            role: role,
        });
        res.status(200).json({
            status: "success",
            data: {
                ...newUser.dataValues,
                password: undefined,
            }
        });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = sha256(sha1(password));
    const foundUser = await User.findOne({where:{username: username}});
    if (foundUser) {
        if (foundUser.password === hashedPassword) {
            const accessToken = jsonwebtoken.sign({ "username": foundUser.username, "role": foundUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "300s", });
            res.cookie("jwt", accessToken, { httpOnly:true, maxAge: 60000});
            res.status(200).json({
                status: "success",
                message: "Login successful.",
            });
        } else {
            res.status(403).json({
                status: "fail",
                message: "Incorrect password.",
            })
        }
    } else {
        res.status(404).json({
            status: "fail",
            message: `User '${username}' doesn't exist.`,
        });
    }
}

export { registerUser, loginUser };