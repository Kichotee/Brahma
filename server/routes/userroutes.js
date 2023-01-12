const express=require('express');
const router = express.Router()
const {registerUser, getUser, loginUser}= require('../controllers/userController')


router.post('/', registerUser)
router.post('/Login', loginUser)
router.get('/user', getUser)
module.exports = router