const express= require('express')
const router= express.Router()
const generateToken= require('../controllers/generateToken')

router.post('/generateToken', generateToken.getToken)

module.exports= router