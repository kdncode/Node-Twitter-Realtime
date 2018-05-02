const router = require('express').Router();
const User = require('../models/user')

router.get('/', (req, res, next) => {
    res.render('main/landing');
});

router.get('/create-new-user', (req, res, next) => {
    var user = new User();
    user.email = 'abc@gmail.com';
    user.name = 'John';
    user.password = 'abc';
    user.save(function(err) {
        if (err) return next(err);
        res.json('Successfully created');
    });
});

module.exports = router;