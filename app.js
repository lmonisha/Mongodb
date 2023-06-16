const express = require('express')
const app = express();
const mongoose = require('mongoose')
var morgan = require('morgan')
require('dotenv').config()

const userRoutes=require('./routes/userRoute')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan('combined'))

app.use('/api/user', userRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
    const db = mongoose.connection
    db.on('error', (err) => {
        console.log('dberror--->', err)
    })
    db.once('open', () => {
        console.log('Database connection successfully established')
        app.listen('7000', () => {
            console.log('iam listening at particular point')
        })
    })
   

