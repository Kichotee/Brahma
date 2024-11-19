const express= require('express');
const router= express.Router();
const {removeUser, addUser, acceptInvite}= require('../controllers/team-controller');
const { protect } = require('../middleware/authMiddleware');


router.post('/add-user/:teamId/:userId', protect, addUser);
router.post('/remove-user/:teamId/:userId', protect, removeUser)
router.post('/accept-invite/:teamId', protect, acceptInvite)

module.exports= router;