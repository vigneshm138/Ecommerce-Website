import { User } from "../Models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from "../Middleware/sendMail.js";


export const userRegistration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check The User Already Exists
        let user = await User.findOne({ email })
        if (user) {
            res.status(400).json({
                message: " User Email Already Exists "
            })
        }

        // Hash The Password
        const hashPassword = await bcrypt.hash(password, 10);
        // Generatte OTP
        const otp = Math.floor(Math.random() * 100000);
        user = { name, email, password: hashPassword };
        // Create Signed Activation Token
        const activationToken = jwt.sign({ user, otp }, process.env.ACTIVATION_SECRET, {
            expiresIn: "4m",
        })
        // Send Mail to User
        const message = `Please Vertify Your Account Using OTP ${otp}`
        await sendMail(email, "Welcome To Our Page ", message);
        res.status(200).json({
            message: "OTP Send Your Given OTP",
            activationToken,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { otp, activationToken } = req.body;
        const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

        if (!verify) {
            return res.json({
                message: "OTP Expired",
            });
        }

        if (verify.otp !== otp) {
            return res.json({
                message: "Wrong OTP ",
            });
        }

        await User.create({
            name: verify.user.name,
            email: verify.user.email,
            password: verify.user.password,
        })

        res.status(200).json({
            message: "User Registration Succes"
        })
    } catch (error) {
        res.send(500).json({
            message: error.message
        })
    }
}

