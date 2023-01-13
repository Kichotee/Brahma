const express=require('express');
const router = express.Router()
const {registerUser, getUser, loginUser}= require('../controllers/userController')
const {protect}= require('../middleware/authMiddleware')


router.post('/', registerUser)
router.post('/Login', loginUser)
router.get('/user',protect, getUser)
module.exports = router