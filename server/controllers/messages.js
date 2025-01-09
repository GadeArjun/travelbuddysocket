const { Message } = require("../models/messages");

exports.saveMessage = async (sender, receiver, messageContent) => {
  
  try {
    const newMessage = new Message({
      sender,
      receiver,
      message: messageContent,
    });

    await newMessage.save();
    console.log("Message saved successfully:", newMessage);
    return true;
  } catch (err) {
    console.error("Error saving message:", err.message);
    return false;
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    console.log(sender, receiver);

    const messages = await Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });

    console.log("Messages:", messages);
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.json("error while getting messages");
  }
};
