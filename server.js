const express = require('express');
const app = express();
const mongoose = require('mongoose');
user_details = mongoose.createConnection('mongodb://localhost:27017/grandma_etty_DB');
give_and_take = mongoose.createConnection('mongodb://localhost:27017/give_and_take');
const PORT = 3000;
const projectRouter = require('./routes/project_router');

const path = require('path');



app.set('view engine', 'ejs');
app.use('/public',express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/grandmaEtty', projectRouter);


app.listen(PORT, () => console.log(`Listen on port ${PORT}`));

