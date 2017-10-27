const mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);

let postingSchema = new Schema({
  caption: {
    type: String,
    required: String
  },
  imageUrl: {
    type: String,
    required: String
  },
  voter: [{
    type: String
  }],
  user: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

postingSchema.pre('update', function(next) {
  this.findOne({
      _id: this._conditions._id
    })
    .then(value => {
      this.updateOne({
          _id: this._conditions._id
        }, {
          updatedAt: Date.now()
        })
        .then(() => {
          next();
        })
        .catch(reason => {
          console.log(reason);
        });
    })
    .catch(reason => {
      console.log(reason);
    })
})

postingSchema.virtual('votes')
  .get(function() {
    return this.voter.length;
  });

postingSchema.virtual('isVoted')
  .get(function() {
    if (this.voter.indexOf(this.user) !== -1) {
      return true;
    } else {
      return false;
    }
  })
  .set(function(user) {
    this.user = user;
  })

module.exports = mongoose.model('Posting', postingSchema);
