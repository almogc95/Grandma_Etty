const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://grandma_etty:grandma_etty12345@almogc95.4gvzlpw.mongodb.net/');

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

user_details = mongoose.createConnection('mongodb://localhost:27017/grandma_etty_DB');
give_and_take = mongoose.createConnection('mongodb://localhost:27017/give_and_take');
const PORT = 3000;
const projectRouter = require('./src/routes/project_router');

const path = require('path');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/grandmaEtty', projectRouter);


app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

