const express=require('express');
const router = express.Router()
const {registerUser, getUser, loginUser}= require('../controllers/user-controller')
const {protect}= require('../middleware/authMiddleware')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user',protect, getUser)
module.exports = router