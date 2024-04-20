import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    try {
        const email = req.body.email;
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(500).json({
                success: false,
                status: 500,
                message: "Email already exists!",
            });
        }

        const username = req.body.username;
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(500).json({
                success: false,
                status: 500,
                message: "Username already exists!",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send({ success: true });
        // res.send({ redirectURL: '/sign-in' });
    } catch (err) {
        next(err);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({
            success: false,
            status: 404,
            message: "User not found!",
        })

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) return res.status(400).json({
            success: false,
            status: 400,
            message: "Wrong Credentials!",
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            // { expiresIn: '1h' }
        );
        const userDetails = {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatarImgURL: user.avatarImgURL,
            profileImgURL: user.profileImgURL,
            accountType: user.accountType
        };

        res.status(200).json({ success: true, userDetails, token });
    } catch (err) {
        next(err);
    }
}
