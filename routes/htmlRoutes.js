const petfinder = require(`@petfinder/petfinder-js`);
const client = new petfinder.Client({ apiKey: process.env.PETFINDER_API, secret: process.env.PETFINDER_SECRET });
const isAuthenticated = require(`../config/middleware/isAuthenticated`);

module.exports = function (app) {
    // Load index page
    app.get(`/`, (req, res, next) => {
        client.animal.search({
            sort: `recent`,
            limit: 15,
            status: `adoptable`
        }).then(response => {
            let animalArr = [];
            response.data.animals.forEach(function (animal) {
                if (animal.photos[0] && animalArr.length !== 3) {
                    animalArr.push(animal);
                }
            });
            res.render(`index`,
                {
                    animal: animalArr,
                    user: req.user || false
                });
        }).catch(err => {
            console.log(err.request, err.response);
            next(err);
        });
    });

    app.get(`/login`, (req, res) => {
        if (req.user) {
            res.redirect(`/`);
        }
        console.log(req.flash(`error`));
        res.render(`login`, { error: req.flash(`error`) });
    });

    app.get(`/signup`, (req, res) => {
        if (req.user) {
            res.redirect(`/`);
        }
        res.render(`signup`);
    });

    app.get(`/profile`, isAuthenticated, (req, res) => {
        res.render(`profile`, {
            user: req.user || false
        });
    });

    app.get(`/search`, (req, res) => {
        if (!req.user) {
            res.redirect(`/`);
        }
        res.render(`search`, {
            user: req.user || false
        });
    });

    app.get(`/animals/:animal?`, (req, res, next) => {
        if (req.params.animal) {
            let animalSearch = req.params.animal.toLowerCase().replace(/^\w/, c => c.toUpperCase());
            client.animal.search(
                {
                    type: animalSearch,
                    sort: `recent`,
                    limit: 50,
                    status: `adoptable`
                })
                .then(response => {
                    let animalArr = [];
                    response.data.animals.forEach((animal) => {
                        if (animal.photos[0] && animalArr.length !== 20) {
                            animalArr.push(animal);
                        }
                    });
                    res.render(`animalSearch`, {
                        animal: animalArr,
                        user: req.user || false
                    });
                }).catch(err => {
                    // res.render(`404`);
                    next(err);
                });
        } else {
            client.animal.search({
                sort: `recent`,
                limit: 50,
                status: `adoptable`
            })
                .then(response => {
                    let animalArr = [];
                    response.data.animals.forEach(function (animal) {
                        if (animal.photos[0] && animalArr.length !== 20) {
                            animalArr.push(animal);
                        }
                    });
                    res.render(`animalSearch`,
                        {
                            animal: animalArr,
                            user: req.user || false
                        });
                }).catch(err => {
                    console.log(err.request, err.response);
                    next(err);
                });
        }
    });

    // Render 404 page for any unmatched routes
    app.get(`*`, function (req, res) {
        res.render(`404`);
    });
};
