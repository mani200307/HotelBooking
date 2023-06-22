import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from "../utils/error.js";


export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email
        })
        await newUser.save()
        res.status(200).send("User has been created.")
    } catch (error) {
        next(error)
    }
}



export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user)
            return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect)
            return next(createError(400, "Password or username is incorrect"));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'abcdefghi1234543321');

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { expires  : new Date(Date.now() + 9999999),
            httpOnly : false});
        res.status(200).json({ ...otherDetails, isAdmin });
    } catch (error) {
        next(error)
    }
}
