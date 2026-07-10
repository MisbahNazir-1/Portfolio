import User from "../models/loginmodel.js";

export const GetAllLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                status: false,
                message: "User is not Registered!!"
            });
        }

        if (user.password !== password) {
            return res.json({
                status: false,
                message: "Invalid Credentials!"
            });
        }

        return res.json({
            status: true,
            message: "Login Success!",
            user: user
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Unable to Login User !!",
            error: err.message
        });
    }
};

export const GetUserRegistered = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, postalcode, phonenumber, address } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                status: false,
                message: "Email already registered !!"
            });
        }

        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password,
            postalcode,
            phonenumber,
            address
        });

        await newUser.save();

        return res.json({
            status: true,
            message: "Account Created Successfully!",
            user: { id: newUser._id, email, firstname }
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Registration Failed: " + err.message
        });
    }
};
