const express = require('express')
const router = express.Router();
const userController=require('../controller/userController')
const auth=require('../middleware/autheticate').verifyToken
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/index', auth,userController.index)
router.post('/show', auth,userController.show)
router.post('/update', auth,userController.update)
router.post('/destroy', auth,userController.destroy)


module.exports = router