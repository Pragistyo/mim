const express = require('express');
const router = express.Router();
const PostingCtrl = require('../controllers/postingCtrl');

router.get('/:userId?', PostingCtrl.getPostings);

module.exports = router;
