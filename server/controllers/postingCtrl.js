const Posting = require('../models/posting');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
      },
      {
        $skip: (req.params.page - 1) * req.params.count
      },
      {
        $limit: parseInt(req.params.count)
      }
    ], function(err, result) {
      if (err)
        res.status(400).json(err);
      else
        res.status(200).json(result);
    })
  }

  static addPosting(req, res, next) {
    // Send to Google cloud storage
    Posting.create({

    })
    res.status(200).json(req.file);
  }

  static upvotePosting (req, res) {

    Posting.findOneAndUpdate(
      { _id: req.body.postId },
      { $push: { voter: req.body.userId } }
    )
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  static downvotePosting (req, res) {

    Posting.findOneAndUpdate(
      { _id: req.body.postId },
      { $pull: { voter: req.body.userId } }
    )
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

}

module.exports = PostingCtrl;
