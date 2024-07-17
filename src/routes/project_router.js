const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../../auth');
const session = require('express-session');
const UserModel = require('../models/google_model');
const grandma_etty_Controller = require('../controllers/grandma_etty_Controller');

// Initialize session with appropriate options
router.use(session({ secret: "cat" }));
router.use(passport.initialize());
router.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}


//HomePage
router.get('/', async (req, res) => {
    res.render('homepage')
});


// LogIn_SignUp
router.get('/logIn_signUp', passport.authenticate('google', { scope: ['email', 'profile'] }));



// LogOut
router.get('/logOut', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.render('homepage');
        });
    });
});


//Authenticate
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/auth/failure'
    })
);


router.get('/auth/failure', (req, res) => {
    res.send('Somthing went wrong...');
});


//Profile
router.get('/profile', isLoggedIn, async (req, res) => {
    const userCheck = await UserModel.findOne({ email: req.user.email });
    res.render('profile', { userName: null || `${ userCheck.displayName }`, userEmail: userCheck.email, userPhoto: userCheck.picture, userPhone: userCheck.phone });
});

router.post('/profile', async (req, res) => {
    try {
        await UserModel.updateOne({ email: req.user.email }, { $set: { phone: req.body.PhoneNumber } });
        res.render('profile', { userName: null || `${req.user.displayName}`, userEmail: req.user.email, userPhoto: req.user.picture, userPhone: req.body.PhoneNumber });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

// Turning the date and time readable
function formatDateTime(value) {
    if (value) {
        let date = new Date(value);
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    };
};


router.get('/giveAndTake', async (req, res) => {
    try {
        const allAcounts = await UserModel.find({});
        const connectingCheck = req.user;
        let allAds_array = []
        for (let i = 0; i < allAcounts.length; i++) {
            for (let j = 0; j < allAcounts[i].ads.length; j++) {
                if (!allAcounts[i].ads[j].taken) {
                    let adValue = {};
                    adValue.displayName = allAcounts[i].displayName;
                    adValue.give = allAcounts[i].ads[j].give;
                    adValue.take = allAcounts[i].ads[j].take;
                    adValue.Date_time = formatDateTime(allAcounts[i].ads[j].Date_time);
                    adValue.until = formatDateTime(allAcounts[i].ads[j].until);
                    adValue.location = allAcounts[i].ads[j].location;
                    adValue.notes = allAcounts[i].ads[j].notes;
                    if (connectingCheck && connectingCheck.googleId===allAcounts[i].googleId) {
                        adValue.ownAd = true;
                    } else {
                        adValue.ownAd = false;
                    }
                    if (!adValue.ownAd) {
                        allAds_array.push(adValue);
                    }
                };
            };
        };

        res.render('giveAndTake', { allAds_array: allAds_array, connectingCheck: connectingCheck });
    } catch (error) {
        console.log(error);
        res.render('giveAndTake', { allAds_array: [] });
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
            notes: req.body.notes,
            taken
        };

        await UserModel.updateOne(
            findUser,
            req.user.ads.length === 0 ? { $set: { ads: [giveAndTakeData] } } : { $push: { ads: giveAndTakeData } }
        );
        const allAcounts = await UserModel.find({});
        const connectingCheck = req.user;
        let allAds_array = []
        for (let i = 0; i < allAcounts.length; i++) {
            for (let j = 0; j < allAcounts[i].ads.length; j++) {
                if (!allAcounts[i].ads[j].taken) {
                    let adValue = {};
                    adValue.displayName = allAcounts[i].displayName;
                    adValue.give = allAcounts[i].ads[j].give;
                    adValue.take = allAcounts[i].ads[j].take;
                    adValue.Date_time = formatDateTime(allAcounts[i].ads[j].Date_time);
                    adValue.until = formatDateTime(allAcounts[i].ads[j].until);
                    adValue.location = allAcounts[i].ads[j].location;
                    adValue.notes = allAcounts[i].ads[j].notes;
                    if (connectingCheck && connectingCheck.googleId === allAcounts[i].googleId) {
                        adValue.ownAd = true;
                    } else {
                        adValue.ownAd = false;
                    }
                    if (!adValue.ownAd) {
                        allAds_array.push(adValue);
                    }
                };
            };
        };

        res.render('giveAndTake', { allAds_array: allAds_array, connectingCheck: connectingCheck });
    } catch (error) {
        console.log(error);
        res.render('giveAndTake', { allAds_array: [] });
    }
});
router.post('/takeAd/:index', async (req, res) => {
    try {
        const allAcounts = await UserModel.find({});
        const connectingCheck = req.user;
        const adIndex = +req.params.index;
        let adCount = 0;
        for (let i = 0; i < allAcounts.length; i++) {
            for (let j = 0; j < allAcounts[i].ads.length; j++) {
                let ownAd;
                if (connectingCheck && connectingCheck.googleId === allAcounts[i].googleId) {
                    ownAd = true;
                } else {
                    ownAd = false;
                }
                if (!allAcounts[i].ads[j].taken && !ownAd) {
                    if (adCount === adIndex) {
                        allAcounts[i].ads[j].taken = true;
                        allAcounts[i].ads[j].takenBy = connectingCheck.googleId;
                        await allAcounts[i].save();
                        return res.sendStatus(200);
                    }
                    adCount++;
                }
            }
        }
        res.sendStatus(404);
    } catch (error) {
        console.log(error);
        res.render('giveAndTake', { allAds_array: [] });
    }
});

router.get('/myTakenAds', async (req, res) => {
    try {
        const connectingCheck = req.user;
        const allAcounts = await UserModel.find({ 'ads.takenBy': connectingCheck.googleId });
        console.log(allAcounts);
        let allAds_array = [];
        for (let i = 0; i < allAcounts.length; i++) {
            for (let j = 0; j < allAcounts[i].ads.length; j++) {
                if (allAcounts[i].ads[j].takenBy) {
                    let adValue = {};
                    adValue.displayName = allAcounts[i].displayName;
                    adValue.give = allAcounts[i].ads[j].give;
                    adValue.take = allAcounts[i].ads[j].take;
                    adValue.Date_time = formatDateTime(allAcounts[i].ads[j].Date_time);
                    adValue.until = formatDateTime(allAcounts[i].ads[j].until);
                    adValue.location = allAcounts[i].ads[j].location;
                    adValue.notes = allAcounts[i].ads[j].notes;
                    allAds_array.push(adValue);
                };
            };
        };
        res.render('myTakenAds', { allAds_array: allAds_array});
    } catch (error) {
        console.log(error);
        res.render('myTakenAds', { allAds_array: [] });
    }
});

router.get('/myAds', async (req, res) => {
    try {
        const connectingCheck = req.user;
        const allAcounts = await UserModel.find({ googleId: connectingCheck.googleId });
        let allAds_array = [];
        for (let i = 0; i < allAcounts.length; i++) {
            for (let j = 0; j < allAcounts[i].ads.length; j++) {
                if (connectingCheck) {
                    let adValue = {};
                    adValue.displayName = allAcounts[i].displayName;
                    adValue.give = allAcounts[i].ads[j].give;
                    adValue.take = allAcounts[i].ads[j].take;
                    adValue.Date_time = formatDateTime(allAcounts[i].ads[j].Date_time);
                    adValue.until = formatDateTime(allAcounts[i].ads[j].until);
                    adValue.location = allAcounts[i].ads[j].location;
                    adValue.notes = allAcounts[i].ads[j].notes;
                    if (connectingCheck && connectingCheck.googleId === allAcounts[i].googleId) {
                        adValue.ownAd = true;
                    } else {
                        adValue.ownAd = false;
                    }
                    if (adValue.ownAd) {
                        allAds_array.push(adValue);
                    }
                };
            };
        };
        res.render('myAds', { allAds_array: allAds_array, connectingCheck: connectingCheck });
    } catch (error) {
        console.log(error);
        res.render('myAds', { allAds_array: [] });
    }
});

router.get('/about', (req, res) => { res.render('about'); });

module.exports = router;
