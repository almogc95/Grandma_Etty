const UserModel = require('../models/user_details');

exports.addUser = async (req, res) => {
    try {
        let userCheck = [];
        userCheck = await UserModel.find({ signUp_email: req.body.signUp_email }); // Check the result if is not exist.
        console.log(userCheck);
        if (userCheck.length > 0) {
            return res.render('signup', { message: 'User already exists.' });
        }
        const New_user = new UserModel(req.body);
        await New_user.save();
        res.send('ok');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

exports.findUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while trying to find the user' })
    }
};