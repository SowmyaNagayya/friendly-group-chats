const {Chat} = require("../models");

module.exports = { 
    async createChat({ body }, res) {
        const chat = await Chat.create(body);
    
        if (!chat) {
          return res.status(400).json({message: 'Unable to create chat'});
        }
        res.status(200).json(chat);
      },

    async getAllChatsForOneGroup (req, res) {
      const allChats = await Chat.find({ });
      //we need to find by specific group id
      if(!allChats) {
        return res.status(400).json({message: 'No chats found'});
      }
      res.status(200).json(allChats);
    }
}