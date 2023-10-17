const conversationSchema = require('../models/Conversation');

exports.addConversation = async(request,response) => {
    let senderId = request.body.senderId;
    let receiverId = request.body.receiverId;

    const exist = await conversationSchema.findOne({ members: { $all: [receiverId, senderId]  }})
    
    if(exist) {
        response.status(201).json('conversation already exists');
        return;
    }
    const newConversation = new conversationSchema({
        members: [senderId, receiverId]
    });

    try {
        const savedConversation = await newConversation.save();
        response.status(200).json(savedConversation);
    } catch (error) {
        response.status(500).json(error);
    }
}

exports.getConversation = async(request,response) => {
    try {
        const conversation = await conversationSchema.findOne({ members: { $all: [ request.body.senderId, request.body.receiverId] }});
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error);
    }
}