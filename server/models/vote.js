const mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);

let votingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postingId: {
    type: Schema.Types.ObjectId,
    ref: 'Posting',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

votingSchema.pre('update', function(next) {
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

module.exports = mongoose.model('Voting', votingSchema);
