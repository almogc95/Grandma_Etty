const express = require('express');
const router = express.Router();
const UserModel = require('../models/user_details');

router.get('/', (req, res) => {
    res.render(`homepage`);
});

router.post('/', async (req, res) => {
    console.log('h')
    const { user_name, email, phone, password } = req.body;
    try {
        let user = new UserModel({ user_name, email, phone, password });
        await user.save();
        res.send('ok');
        // res.render('giveAndTake');

    } catch (error) {
        console.log(req.body)
        res.status(500).json({ error: 'An error occurred while creating the user' })
    }
});

router.get('/giveAndTake', (req, res) => {
    res.render('giveAndTake');
});

router.post('/giveAndTake', (req, res) => {
    res.render('giveAndTake');
});

router.get('/chats', (req, res) => {
    res.render('chats');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/donate', (req, res) => {
    res.render('donate');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

module.exports = router;
