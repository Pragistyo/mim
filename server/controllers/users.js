const User = require('../models/users');


class UserCRUD {
    constructor() {

    }

    static findAll(req, res) {
        User.findAll((users, err) => {
            if (err) res.send(err)
                res.send(users)
        })
    }

    static create(req, res) {
        var body = req.body.userdata;
        User.create(body, (user, err) => {
            if (err) res.send(err)
                res.send(jwtToken)
        })
    }

    static update(req, res) {
        User.update(req.params.id, req.body, (user, err) => {
            if (err) res.send(err)
                res.send(user)
        })
    }

    static delete(req, res) {
        User.delete(req.params.id, (mess, err) => {
            if (err) res.send(err)
                res.send(mess)
        })
    }
}

module.exports = UserCRUD;
