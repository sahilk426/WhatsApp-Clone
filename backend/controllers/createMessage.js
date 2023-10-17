const conversationSchema = require('../models/Conversation');
const MessageSchema = require('../models/Message');

exports.createMessage = async(request,response) => {
    const newMessage = new MessageSchema(request.body);
    try {
        await newMessage.save();
        await conversationSchema.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        response.status(500).json(error);
    }
}
exports.getMessage = async(request,response) => {
    try {
        const messages = await MessageSchema.find({ conversationId: request.params.id });
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error);
    }
}