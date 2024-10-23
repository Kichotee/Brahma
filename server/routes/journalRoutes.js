const express= require('express');
const router = express.Router();
const {getJournals, postJournals, updateJournals, delJournals}=require('../controllers/journal-controller')
const {protect}= require('../middleware/authMiddleware')

router.route('/').get( protect,getJournals).post(protect, postJournals)

router.route('/').put(protect, updateJournals); 
router.route('/:id').delete(protect,delJournals)


module.exports = router