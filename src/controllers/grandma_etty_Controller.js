const UserModel = require('../models/user_details');

exports.addUser = async (req, res) => {
    try {
        const data = {
            signUp_email: req.body.signUp_email,
            signUp_user_name: req.body.signUp_name,
            signUp_password: req.body.signUp_password,
            signUp_bio: req.body.signUp_bio
        }

        //Check if user already exists in DB
        const existingUser = await UserModel.findOne({ signUp_email: data.signUp_email });
        console.log(existingUser);
        if (existingUser) {
            return res.render('signUp', { message: 'User already exists.' });
        }
        else {
            const New_user = new UserModel(data);
            await New_user.save();
            res.render('logIn', { login_message: null });
        }

        //old code - delete
        //Check if user already exists in DB
        // let userCheck = [];
        // userCheck = await UserModel.find({ signUp_email: req.body.signUp_email });
        // if (userCheck.length > 0) {
        //     return res.render('signUp'); /*{ message: 'User already exists.' }*/ //Check the error of message
        // } // Check the result if is not exist.
        // else {
        //     const New_user = new UserModel(req.body);
        //     await New_user.save();
        //     res.render('LogIn');
        // }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

exports.findUser = async (req, res) => {
    try {
        //Check if user exists in DB
        const data = {
            signUp_email: req.body.LogIn_email,
            signUp_password: req.body.LogIn_password
        }
        const userCheck = await UserModel.findOne({ signUp_email: data.signUp_email });
        console.log(userCheck);
        if (!userCheck) {
            return res.render('logIn', { login_message: 'User dose not exists' });
        }
        if (userCheck.signUp_password != data.signUp_password) { //TODO not working with !==, the type&value not the same
            return res.render('logIn', { login_message: 'The password do not match' });
        }

        return res.status(200).render('profile', { profile_message: userCheck });


        //old code - delete
        // let userCheck = [], email = req.body.LogIn_email, password = req.body.LogIn_password;
        // userCheck = await UserModel.find({ LogIn_email: email, LogIn_password: password })
        // if (userCheck.signUp_email === req.body.LogIn_email && userCheck.signUp_password === req.body.LogIn_password) {
        //     res.render('profile', { name: req.body.LogIn_email });
        // }
        // else {
        //     return res.render('LogIn'); /*{ message: 'User already exists.' }*/ //Check the error of message
        // }

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
                return res.render('logIn'); /*{ message: 'User already exists.' }*/ //Check the error of message
        });
        console.log(`The user with the id:${req.params.id} connect`);
        res.render('profile');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while trying to find the user' })
    }
};