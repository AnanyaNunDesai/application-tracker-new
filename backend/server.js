require('dotenv').config()

const express = require('express')
const applicationRoutes = require('./routes/applications')
const mongoose = require('mongoose')

//express app
const tracker = express()

//middleware
tracker.use(express.json())

tracker.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
tracker.use('/api/applications', applicationRoutes)

//connect to DB
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for requests
        tracker.listen(process.env.PORT, () => {
            console.log("Connected to DB and listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



