var db = require(`../models`);
const passport = require(`../config/passport`);

module.exports = function(app) {
    app.post(`/api/signup`, (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(() => {
            res.json(200).end();
        }).catch((err) => {
            res.json(err);
        });
    });

    app.post(`/api/login`, passport.authenticate(`local`), (req, res) => {
        res.json(`/members`);
    });
};

