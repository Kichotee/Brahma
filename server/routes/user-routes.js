const express=require('express');
const router = express.Router()
const {registerUser, getUser, loginUser, confirmMail}= require('../controllers/user-controller')
const {protect}= require('../middleware/authMiddleware')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/verify-account/:Id', confirmMail)
router.get('/user',protect, getUser)
module.exports = router