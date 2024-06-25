const express = require('express');
const router = express.Router();
const UserModel = require('../models/user_details');

router.get('/', (req, res) => {
    res.render('homePage');
});

router.post('/', async (req, res) => {
    res.render('homePage');
    try {
        const { name, email, phone, password} = req.body;
        let user = new UserModel(req.body);
        await user.save();
        res.render('giveAndTake');

    } catch (error) {
        
    }
});

router.get('/giveAndTake', (req, res) => {
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
