import User from "../Models/user.js";
import Engineer from "../Models/engineer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const Signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            engineer_type,
            max_degree,
            experience,
        } = req.body;

        //basic validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password:hashed_password,
            role,
        });
        if (role === "ENGINEER") {
            if (!engineer_type || !max_degree || experience === undefined) {
                return res
                    .status(400)
                    .json({ message: "Engineer details missing" });
            }



            await Engineer.create({
                user_id: user._id,
                engineer_type,
                max_degree,
                experience,
            });
        }

        res.json({message: "Signup successful.Now you can login to the website" });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error in signup" });
    }

}




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing credentials" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

    const token = jwt.sign(
      { id: user._id ,role:user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

        return res.json({ //we return role also as we need it to navigate user to client or engineer dashboard accordingly
            token,
            role: user.role,
            message:"Login successful!"
        });
    } catch (err) {
        console.log(err);//helps to find where error occurs
        return res.status(500).json({ message: "Server error in login" });
    }
};
