const Posting = require('../models/posting');

class PostingCtrl {
  static getPostings(req, res, next) {
    Posting.find().exec()
      .then((posts) => {
        let result = [];
        posts.forEach(post => {
          post.set('isVoted', req.params.userId);
          let row = {
            "_id": post._id,
            "imageUrl": post.imageUrl,
            "caption": post.caption,
            "votes": post.votes,
            "voted": post.isVoted
          }
          result.push(row);
          console.log('asdasd', row);
        })
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

  static addPosting(req, res, next) {
    // Send to Google cloud storage
    Posting.create({

    })
    res.status(200).json(req.file);
  }
}

module.exports = PostingCtrl;
