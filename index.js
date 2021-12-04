// const mongoose = require('mongoose')
const express = require('express');
const app = express();
app.use(express.json());
//routes
const articlesRoute = require('./routes/articles.js')
const draftsRoute = require('./routes/drafts.js')
const writersRoute = require('./routes/writers.js')
const podcastsRoute = require('./routes/podcasts.js')

app.use('/articles', articlesRoute);
app.use('/drafts', draftsRoute);
app.use('/writers', writersRoute);
app.use('/podcasts', podcastsRoute);


// app.use('/', (req, res)=> {res.send('home')});
// middleware




// mongoose.connect(
//     'mongodb+srv://duta3135db:Gonzaga316db@test-api.kugea.mongodb.net/test-api?retryWrites=true&w=majority', 
//     {useNewUrlParser: true},
//     ()=>console.log('connected'));

app.listen(3001);