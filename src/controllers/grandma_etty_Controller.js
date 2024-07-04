const UserModel = require('../models/user_details');

exports.addUser = async (req, res) => {
    try {
        let userCheck = [], email = req.body.signUp_email;
        userCheck = await UserModel.find({ signUp_email: req.body.signUp_email });
        if (userCheck.length > 0) {
            return res.render('signUp'); /*{ message: 'User already exists.' }*/ //Check the error of message
        } // Check the result if is not exist.
        const New_user = new UserModel(req.body);
        await New_user.save();
        res.render('LogIn');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

exports.findUser = async (req, res) => {
    try {
        let userCheck = [], email = req.body.LogIn_email, password = req.body.LogIn_password;
        userCheck = await UserModel.find({ LogIn_email: email, LogIn_password: password })
        if (userCheck.signUp_email === req.body.LogIn_email && userCheck.signUp_password === req.body.LogIn_password) {
            res.render('profile');
        }
        else {
            return res.render('LogIn'); /*{ message: 'User already exists.' }*/ //Check the error of message
        }

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

exports.addNote = async (req, res) => {
    try {
        const newNote = new UserModel(req.body);
        await newNote.save();
        res.render('giveAndTake');
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.showUser = async (req, res) => {
    try {
        let id = req.params.id;
        userCheck = await UserModel.find({ _id: id }, (err, isMatch) => {
            if (err)
                return res.status(500).send(err);
            if (!isMatch)
                return res.render('LogIn'); /*{ message: 'User already exists.' }*/ //Check the error of message
        });
        console.log(`The user with the id:${req.params.id} connect`);
        res.render('profile');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while trying to find the user' })
    }
};