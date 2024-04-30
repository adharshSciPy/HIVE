const MessageSchema = require("../models/messageSchema");
const UserSchema = require("../models/userSchema")

module.exports = {
  getChatUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const userToIgnore = await UserSchema.findById(userId);
      const users = await UserSchema.find({ _id: { $ne: userToIgnore._id } });
      res.status(200).json({ message: "Chat users found", users });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  postMessage: async (req, res) => {
    const { from, to, message } = req.body;

    try {
      const newMessage = await MessageSchema.create({
        message: message,
        chatUsers: [from, to],
        sender: from,
      });

      if (newMessage) {
        res.status(200).json({ message: "Successfully message posted" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllMessages: async (req, res) => {
    const from = req.params.sender;
    const to = req.params.receiver;

    try {
      const newMessage = await MessageSchema.find({
        chatUsers: {
          $all: [from, to],
        },
      }).sort({ updatedAt: -1 });


      const allMessage = newMessage.map((msg) => {
        return {
          mySelf: msg.sender.toString() === from,
          message: msg.message,
        };
      });

      return res.status(200).json({ message: "Get All Messages", allMessage });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};
