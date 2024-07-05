const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3000;
const projectRouter = require('./src/routes/project_router');

const dotenv = require('dotenv');
dotenv.config({
    path: '.env'
});

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@grandmaetty.dpgfu0a.mongodb.net/grandma_etty_DB`

mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', projectRouter);


app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

