const Applications = require('../models/applicationsModel')
const mongoose = require('mongoose')

//get all applications
const getApplications = async (req, res) => {
    const applications = await Applications.find({}).sort({ createdAt: -1 })

    res.status(200).json(applications)
}

//get one application
const getApplication = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such application." })
    }

    const application = await Applications.findById(id)

    if (!application) {
        return res.status(404).json({ error: 'No such application.' })
    }

    res.status(200).json(application)
}

//create new application
const createApplication = async (req, res) => {
    const { comp, salary, status } = req.body

    let emptyFields = []

    if(!comp) {
        emptyFields.push('comp')
    }
    if(!salary) {
        emptyFields.push('salary')
    }
    if(!status) {
        emptyFields.push('status')
    }
    if (emptyFields.length>0) {
        return res.status(400).json({error: 'Field cannot be empty.', emptyFields})
    }
    

    //add doc to DB
    try {
        const application = await Applications.create({ comp, salary, status })
        res.status(200).json(application)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete an application
const dltApplication = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such application." })
    }

    const application = await Applications.findOneAndDelete({ _id: id })

    if (!application) {
        return res.status(404).json({ error: 'No such application.' })
    }

    res.status(200).json(application)
}

//update an application
const updateApplication = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such application." })
    }

    const application = await Applications.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if(!application) {
        return res.status(400).json({ error: "Couldn't update the application." })
    }

    res.status(200).json(application)
}


module.exports = {
    createApplication,
    getApplications,
    getApplication,
    dltApplication,
    updateApplication
}