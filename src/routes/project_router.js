const express = require('express');
const router = express.Router();
// const UserModel = require('../models/user_details');
const grandma_etty_Controller = require('../controllers/grandma_etty_Controller');

router.get('/', (req, res) => {
    res.render(`homepage`);
});

router.post('/', grandma_etty_Controller.addUser);

// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body)
//         const New_user = new UserModel(req.body);
//         await New_user.save();
//         res.send('ok');
//         // res.render('giveAndTake');

//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while creating the user' })
//     }
// });

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
