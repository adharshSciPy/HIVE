const MessageSchema = require("../models/messageSchema");

module.exports = {
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

      console.log(newMessage);

      const allMessage = newMessage.map((msg) => {
        return {
          mySelf: msg.sender.toString() === from,
          message: msg.message,
        };
      });

      res.status(200).json({ message: "Get All Messages", allMessage });
      console.log("respond success");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
