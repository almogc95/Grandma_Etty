const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

app.get('/', (req, res) => {
    res.render('homePage');
});

app.get('/giveAndTake', (req, res) => {
    res.render('giveAndTake');
});

app.get('/chats', (req, res) => {
    res.render('chats');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/donate', (req, res) => {
    res.render('donate');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});