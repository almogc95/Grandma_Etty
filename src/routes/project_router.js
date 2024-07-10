const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../auth');
const session = require('express-session');
router.use(session({ secret: "cat" }));
router.use(passport.initialize());
router.use(passport.session());
const grandma_etty_Controller = require('../controllers/grandma_etty_Controller');
const UserModel = require('../models/user_details');



function isLoggedIn(req, res, next) {
    req.user ? next() : req.sendStatus(401);
}

//HomePage
router.get('/', (req, res) => { res.render('homepage'); });

//SignUp
router.get('/signUp', (req, res) => { res.render('signUp', { message: null }); });

router.post('/signUp', grandma_etty_Controller.addUser);

//LogIn
router.get('/logIn',
    passport.authenticate('google', { scope: ['email', 'profile'] })
    // res.render('LogIn', { login_message: null });
);

// router.post('/logIn', grandma_etty_Controller.findUser);

router.get('/logOut', (req, res) => {
    req.logOut();
    req.session.destroy();
    res.send('Goodbye!');
});

//Authenticate
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/auth/failure'
    }));

router.get('/auth/failure', (req, res) => {
    res.send('Somthing went wrong...');
});

router.get('/profile/', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('profile', { profile_message: null || `${req.user.displayName}` });
});

// { email_user: null || `${req.email.email}`
// router.post('/profile', (req, res) => { res.render('profile') });

// router.get('/profile/:id', (req, res) => { res.render('profile') });


// router.get('/profile', grandma_etty_Controller.showUser);




router.get('/giveAndTake', (req, res) => { res.render('giveAndTake'); });

router.post('/giveAndTake', isLoggedIn, async (req, res) => {
    try {
        const giveAndTakeData = {
            give: req.body.give,
            take: req.body.take,
            Date_time: req.body.Date_time,
            until: req.body.until,
            location: req.body.location,
            notes: req.body.notes
        };
        console.log(`User new ad: ${giveAndTakeData}`);

        const newNote = {
            give,
            take,
            Date_time,
            until,
            location,
            notes
        };

        await UserModel.updateOne(
            { googleId: req.user.googleId },
            { $push: { ads: newNote } }
        );
        res.redirect('/profile');
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


router.get('/chats', (req, res) => { res.render('chats'); });

router.get('/about', (req, res) => { res.render('about'); });

router.get('/donate', (req, res) => { res.render('donate'); });



module.exports = router;