const db = require(`../models`);

module.exports = function(app) {
    // Load index page
    app.get(`/`, function(req, res) {
        res.render(`index`);
    });

    app.get(`/profile`, (req, res) => {
        db.User.findAll({}).then((err, result) => {
            res.render(`userProfile`, {user: result});
        });
    });

    // Render 404 page for any unmatched routes
    app.get(`*`, function(req, res) {
        res.render(`404`);
    });
};
