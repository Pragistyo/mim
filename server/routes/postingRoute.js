const express = require('express');
const router = express.Router();

const files = require('../helpers/files');
const PostingCtrl = require('../controllers/postingCtrl');

router.get('/:userId?', PostingCtrl.getPostings);
router.post('/add_post', files.multer.single('image'), files.sendUploadToGCS, (req, res, next) => {
  PostingCtrl.addPosting(req, res, next)
});

module.exports = router;
