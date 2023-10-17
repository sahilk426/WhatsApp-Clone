const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array
        },
        message: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("conversationSchema",conversationSchema);