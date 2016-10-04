const User = require('../models/user');

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'});
    }

    // See if a user with this email exists
    User.findOne({email: email}, function(err, existingUser) {
        if (err) { return next(ett);}
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if (err) { return next(err); }

            // Respond to request indicating the user was created
            res.json({success: true});
        });
    });


};