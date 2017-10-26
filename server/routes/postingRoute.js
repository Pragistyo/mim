const express = require('express');
const router = express.Router();

const image = require('../helpers/image');
const PostingCtrl = require('../controllers/postingCtrl');

router.get('/:userId?', PostingCtrl.getPostings);
router.post('/add_post', image.multer.single('image'), (req, res, next) => {
  PostingCtrl.addPosting(req, res, next)
});

module.exports = router;
