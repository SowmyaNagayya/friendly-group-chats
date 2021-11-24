const {Chat} = require("../models");

module.exports = { 
    async createChat({ body }, res) {
        const chat = await Chat.create(body);
    
        if (!chat) {
          return res.status(400).json({message: 'Unable to create chat'});
        }
        res.status(200).json(chat);
      },
}