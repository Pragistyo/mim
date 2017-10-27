const express = require('express');
const router = express.Router();
const User = require('../controllers/users')


router.post('/', User.create)

router.get('/', User.findAll)

router.put('/:id', User.update)

router.delete('/:id', User.delete)

module.exports = router;
