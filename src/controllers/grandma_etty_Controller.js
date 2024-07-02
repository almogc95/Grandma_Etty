const UserModel = require('../models/user_details');

exports.addUser = async (req, res) => {
    try {
        console.log(req.body)
        const New_user = new UserModel(req.body);
        await New_user.save();
        res.send('ok');
        // res.render('giveAndTake');

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' })
    }
};
