const express = require('express')
const {
    createApplication,
    getApplications,
    getApplication,
    dltApplication,
    updateApplication
} = require('../controllers/applicationController')

const router = express.Router()

//GET all applications
router.get('/', getApplications)

//GET a single application
router.get('/:id', getApplication)

//POST new application
router.post('/', createApplication)

//DELETE an application
router.delete('/:id', dltApplication)

//UPDATE an application
router.patch('/:id', updateApplication)

module.exports = router