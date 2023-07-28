const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

//routes
const teachersRouter = require('./routes/teachers');
const deptRouter = require('./routes/depts');
const publicationRouter = require('./routes/publications');

const api = process.env.API_URL;

app.use(`${api}/teachers`, teachersRouter);
app.use(`${api}/depts`, deptRouter);
app.use(`${api}/publications`, publicationRouter);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'portfolio_db'
}) 
.then(()=>{
    console.log('Database connection is ready..');
}).catch((err)=>{
    console.log(err);
})

module.exports = app;