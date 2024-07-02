const express = require('express');
const router = express.Router();
// const UserModel = require('../models/user_details');
const grandma_etty_Controller = require('../controllers/grandma_etty_Controller');

router.get('/', (req, res) => {
    res.render(`homepage`);
});


router.get('/signUp', (req, res) => {
    res.render('signup');
});

router.post('/signUp', grandma_etty_Controller.addUser);


router.get('/LogIn', (req, res) => {
    res.render('LogIn');
});
router.post('/LogTn', grandma_etty_Controller.findUser);


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
