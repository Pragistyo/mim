const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "id": { type: String, required: true },
    "name": { type: String, required: true },
    "email": { type: String, required: true },
    "pictUrl": { type: String, required: true }
})

const User = mongoose.model('Users', userSchema)

class UserCRUD{

    static findAll(cb) {
        User.find((err, users) => {
            if (err) {
                cb(err)
            } else {
                cb(users)
            }
        })
    }

    static create(body, cb) {
        let user = new User(body)
        user.save()
            .then(user => {
                cb(user)
            })
            .catch(err => {
                cb(err)
            })
    }

    static update(params, body, cb) {
        User.findById(params)
            .then(user => {
                user.id = body.id || user.id;
                user.name = body.name || user.name;
                user.email = body.email || user.email;
                user.pictUrl = body.pictUrl || user.pictUrl;
                user.save()
                    .then(user => {
                        cb(user)
                    })
            })
            .catch(err => {
                cb(err)
            })
    }

    static delete(params, cb) {
        User.findByIdAndRemove(params)
            .then((user) => {
                let message = {
                    msg: "Success remove",
                    user
                }
                cb(message)
            })
            .catch(err => {
                cb(err)
            })
    }

}

module.exports = UserCRUD;