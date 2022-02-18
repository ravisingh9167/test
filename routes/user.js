//External Modules
const express= require('express')
const router= express.Router()

//controllers
const userController= require('../controllers/user')

//Middlewares
const TokenVerifyMiddleware= require('../middlewares/Token_Verify_Middleware')

router.get('/users', TokenVerifyMiddleware, userController.getAllUsers)
router.get('/users/:id', TokenVerifyMiddleware, userController.getUser)
router.post('/users', TokenVerifyMiddleware, userController.createUser)
router.put('/users/:id', TokenVerifyMiddleware, userController.updateUser)
router.delete('/users/:id', TokenVerifyMiddleware, userController.deleteUser)

module.exports= router