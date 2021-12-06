//the forrest of a thousand imports
const mongoose = require('mongoose')
const express = require('express');
const app = express();
app.use(express.json());
const articlesRoute = require('./routes/articles.js')
const draftsRoute = require('./routes/drafts.js')
const writersRoute = require('./routes/writers.js')
const podcastsRoute = require('./routes/podcasts.js')
//routes
app.use('/articles', articlesRoute);
app.use('/drafts', draftsRoute);
app.use('/writers', writersRoute);
app.use('/podcasts', podcastsRoute);
//mongo
mongoose.connect(
    `mongodb+srv://duta3135db:${process.env.MONGO_PW}@test-api.kugea.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    ()=>console.log('connected to db')
)

app.listen(3001);