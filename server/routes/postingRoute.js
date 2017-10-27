const express = require('express');
const router = express.Router();

const files = require('../helpers/files');
const PostingCtrl = require('../controllers/postingCtrl');

const upload = files.multer.single('image');

router.get('/:userId?', PostingCtrl.getPostings);
router.post('/add_post', (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        error: 'err'
      });
    }

    // Proceed to GCP
    next();

  });
}, files.sendUploadToGCS, (req, res, next) => {
  PostingCtrl.addPosting(req, res, next)
});
router.put('/upvote', PostingCtrl.upvotePosting);
router.put('/downvote', PostingCtrl.downvotePosting);

module.exports = router;
