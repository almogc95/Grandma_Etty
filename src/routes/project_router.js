const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../auth');
const session = require('express-session');
router.use(session({ secret: "cat" }));
router.use(passport.initialize());
router.use(passport.session());
const grandma_etty_Controller = require('../controllers/grandma_etty_Controller');
const UserModel = require('../models/google_model');



function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
    // req.user ? next() : res.redirect('/');
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

//Profile
router.get('/profile', isLoggedIn, async (req, res) => {
    const userCheck = await UserModel.findOne({ email: req.user.email });
    res.render('profile', { userName: null || `${userCheck.displayName}`, userEmail: userCheck.email, userPhoto: userCheck.picture, userPhone: userCheck.phone });
});

router.post('/profile', async (req, res) => {
    try {
        await UserModel.updateOne({ email: req.user.email }, { $set: { phone: req.body.PhoneNumber } });
        res.render('profile', { userName: null || `${req.user.displayName}`, userEmail: req.user.email, userPhoto: req.user.picture, userPhone: req.body.PhoneNumber });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

router.get('/giveAndTake', async (req, res) => {
    try {
        const usersData = await UserModel.find({});
        const allAds = usersData.reduce((ads, user) => {
            const userAdsWithDisplayName = user.ads.map(ad => ({
                ...ad,
                displayName: user.displayName
            }));
            return ads.concat(userAdsWithDisplayName)
        }, []);
        res.render('giveAndTake', { ads: allAds});
    } catch (error) {
        console.log(error);
        res.render('giveAndTake', { ads: [] });
    }
});

router.post('/giveAndTake', async (req, res) => {
    try {
        const findUser = { googleId: req.user.googleId };
        const giveAndTakeData = {
            give: req.body.give,
            take: req.body.take,
            Date_time: req.body.Date_time,
            until: req.body.until,
            location: req.body.location,
            notes: req.body.notes
        };

        await UserModel.updateOne(
            findUser,
            req.user.ads.length === 0 ? { $set: { ads: [giveAndTakeData] } } : { $push: { ads: giveAndTakeData } }
        );

        const usersData = await UserModel.find({});
        const allAds = usersData.reduce((ads, user) => {
            const userAdsWithDisplayName = user.ads.map(ad => ({
                ...ad,
                displayName: user.displayName
            }));
            // console.log(`userAdsWithDisplayName: ${userAdsWithDisplayName}`);
            return ads.concat(userAdsWithDisplayName)
        }, []);
        // console.log(`allAds: ${allAds}`);
        res.render('giveAndTake', { ads: allAds });
    } catch (error) {
        console.log(error);
        res.render('giveAndTake', { ads: [] });
    }
});

router.get('/chats', (req, res) => { res.render('chats'); });

router.get('/about', (req, res) => { res.render('about'); });

router.get('/donate', (req, res) => { res.render('donate'); });

module.exports = router;
