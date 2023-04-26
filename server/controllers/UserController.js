const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res, next) => {
    const { fullName, role, email, password, gender, dob, college, course } =
      req.body;

    try {
      // hashing password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // checking the user is existed or not with email
      const userExist = await User.findOne({ email });
      if (userExist) {
        res.status(400).json({ message: "User already Existed" });
      }
      await User.create({
        fullName,
        role,
        email,
        password: hashedPassword,
        gender,
        dob,
        college,
        course,
      });
      res.status(200).json({ message: "User added to mongodb succesfully" });
      next();
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log(`Server Error ${err}`);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // find the user
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "User Not Found" });
      }

      // checking password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ message: "Password is Incorrect" });
      }
      // generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, "IamGreat", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Logged In Succesfully", user, token });
      next();
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log(`server Error ${err}`);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const allUsers = await User.find();
      if (!allUsers) {
        res.status(400).json({ message: "No users Found" });
      } else {
        const sortedUser = allUsers.map((user) => {
          return {
            userid: user._id,
            fullName: user.fullName,
            role: user.role,
          };
        });
        res.status(200).json({ message: "Users Found", sortedUser });
      }
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log(err);
    }
  },

  // verify token
  verifyToken: async (req, res) => {
    const { token } = req.body;
    try {
      const verify = jwt.verify(token, "IamGreat");
      if (!verify) {
        res.status(400).json({ message: "Verification failed" });
      }
      res.status(200).json({ message: "Verification Success" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log("Verification Error" + err);
    }
  },

  //   forget password apis
  findAccount: async (req, res, next) => {
    const { email } = req.body;
    console.log(req.body);

    try {
      // findin accout with given email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Account Not Found" });
      }

      res.status(200).json({ message: "Account Founded", user });
      next();
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  updatePassword: async (req, res, next) => {
    const { id } = req.params;
    const { newPassword } = req.body;
    console.log(req.params);
    console.log(req.body);

    try {
      // hasing new password
      const salt = await bcrypt.genSaltSync(10);
      const newHashedPassword = await bcrypt.hash(
        newPassword,
        salt,
        (err, data) => console.log(err)
      );
      const updateUserPassword = await User.findByIdAndUpdate(
        id,
        {
          password: newHashedPassword,
        },
        { new: true }
      );
      if (!updateUserPassword) {
        res.status(400).json({ message: "User Id error" });
      }
      res.status(200).json({ message: "Password changed succesfully" });
      next();
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(err);
    }
  },

  getAccountWithID: async (req, res) => {
    const { _id } = req.params.id;
    const user = await User.find({ _id: req.params.id });

    try {
      if (!user) {
        res.status(400).json({ message: "User Not found" });
      }
      res.status(200).json({ message: "User found", user });
    } catch (err) {
      res.status(500).json({ message: "User Found" });
    }
  },
};
