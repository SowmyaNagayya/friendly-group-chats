const {Chat} = require("../models");

module.exports = { 
    async createChat(req, res) {
        const chat = await Chat.create({
          body: req.body.input.body,
          user: req.session.user_id,
          group: req.body.id,
        });
    
        if (!chat) {
          return res.status(400).json({message: 'Unable to create chat'});
        }
        res.status(200).json(chat);
    },

    async getAllChatsForOneGroup (req, res) {
      const allChats = await Chat.find({group: req.params.id});
  
      if(!allChats) {
        return res.status(400).json({message: 'No chats found'});
      }
      res.status(200).json(allChats);
    },


}