const Posting = require('../models/posting');

class PostingCtrl {
  static getPostings(req, res, next) {
    Posting.aggregate([{
        $project: {
          imageUrl: 1,
          caption: 1,
          votes: {
            $size: "$voter"
          },
          voted: {
            $cond: [{
                $in: [req.params.userId, "$voter"]
              },
              true,
              false
            ]
          },
          createdAt: 1
        }
      },
      {
        $sort: {
          createdAt: -1,
          votes: -1,
        }
      }
    ], function(err, result) {
      if (err)
        res.status(400).json(err);
      else
        res.status(200).json(result);
    })
  }

  static addPosting(req, res, next) {
    Posting.create({
        caption: req.body.caption,
        imageUrl: req.file.cloudStoragePublicUrl,
        voter: [],
        user: req.body.userId
      })
      .then((newPost) => {
        res.status(200).json(newPost);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }
}

module.exports = PostingCtrl;
