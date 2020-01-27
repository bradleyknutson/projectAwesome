const db = require(`../models`);
const petfinder = require(`@petfinder/petfinder-js`);
const client = new petfinder.Client({apiKey: process.env.PETFINDER_API, secret: process.env.PETFINDER_SECRET});
const isAuthenticated = require(`../config/middleware/isAuthenticated`);

module.exports = function(app) {
    // Load index page
    app.get(`/`, function(req, res) {
        res.render(`index`);
    });

    app.get(`/login`, (req, res) => {
        if(req.user){
            res.redirect(`/`);
        }
        res.render(`login`);
    });

    app.get(`/profile`, (req, res) => {
        db.User.findOne({}).then((err, result) => {
            res.render(`profile`, {user: result,});
        });
    });

    app.get(`/animals/:animal?`, (req, res, next) => {
        if(req.params.animal){
            let animalSearch = req.params.animal.toLowerCase().replace(/^\w/, c=> c.toUpperCase());
            client.animal.search(
                {
                    type: animalSearch,
                    sort: `recent`,
                    limit: 30,
                    status: `adoptable`
                })
                .then(response => {
                    res.render(`animalSearch`, {animal: response.data.animals});
                }).catch(err => {
                    // res.render(`404`);
                    next(err);
                });
        }else{
            client.animal.search({
                sort: `recent`,
                limit: 30,
                status: `adoptable`
            })
                .then(response => {
                    res.render(`animalSearch`, {animal: response.data.animals});
                }).catch(err => {
                    console.log(err.request, err.response);
                    next(err);
                });
        }
    });

    app.get(`/small_animals`, (req, res) => {
        res.render(`animals`);
    });

    // Render 404 page for any unmatched routes
    app.get(`*`, function(req, res) {
        res.render(`404`);
    });
};
