const express= require('express');
const router = express.Router();
const {getJournals, postJournals, updateJournals, delJournals}=require('../controllers/journalController')


router.get('/', getJournals)

router.post('/', postJournals)
router.put('/:id', updateJournals)
router.delete('/:id', delJournals)
module.exports = router