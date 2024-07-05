const express = require('express');
const router = express.Router();
const grandma_etty_Controller = require('../controllers/grandma_etty_Controller');

//HomePage
router.get('/', (req, res) => { res.render('homepage'); });

//SignUp
router.get('/signUp', (req, res) => { res.render('signUp', { message: null }); });

router.post('/signUp', grandma_etty_Controller.addUser);

//LogIn
router.get('/logIn', (req, res) => { res.render('LogIn', { login_message: null }); });

router.post('/logIn', grandma_etty_Controller.findUser);

//Profile
router.get('/profile', (req, res) => { res.render('profile', { profile_message: null }); });

// router.post('/profile', (req, res) => { res.render('profile') });
// router.get('/profile/:id', (req, res) => { res.render('profile') });


// router.get('/profile', grandma_etty_Controller.showUser);




router.get('/giveAndTake', (req, res) => { res.render('giveAndTake'); });

router.post('/giveAndTake', grandma_etty_Controller.addNote);

router.get('/chats', (req, res) => { res.render('chats'); });

router.get('/about', (req, res) => { res.render('about'); });

router.get('/donate', (req, res) => { res.render('donate'); });



module.exports = router;
