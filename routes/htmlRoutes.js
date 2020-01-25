const db = require(`../models`);

module.exports = function(app) {
    // Load index page
    app.get(`/`, function(req, res) {
        res.render(`index`);
    });

    app.get(`/profile`, (req, res) => {
        db.User.findAll({}).then((err, result) => {
            res.render(`profile`, {user: result});
        });
    });

    app.get(`/:animal`, (req, res) => {
        res.render(`animals`);
    });

    app.get(`/small_animals`, (req, res) => {
        res.render(`animals`);
    });

    // Render 404 page for any unmatched routes
    app.get(`*`, function(req, res) {
        res.render(`404`);
    });
};
