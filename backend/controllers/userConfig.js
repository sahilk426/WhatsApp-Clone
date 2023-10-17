const userSchema = require('../models/User');


exports.addUser = async (request, response) => {
    try {
        const exist = await userSchema.findOne({ sub: request.body.sub });

        if(exist) {
            response.status(201).json('user already exists');
            return;
        }

        const newUser = new userSchema(request.body);
        await newUser.save();
        response.status(200).json(newUser);
    } catch (error) {
        response.status(500).json(error);
    }
}

exports.getUser = async (request, response) => {
    try {
        const user = await userSchema.find({});
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
}