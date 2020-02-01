const db = require(`../models`);
const passport = require(`../config/passport`);
const bodyParser = require(`body-parser`);
const upload = require(`../config/middleware/multer`);
const cloudinary = require(`cloudinary`);
require(`../config/cloudinary`);


module.exports = function (app) {
    app.post(`/api/signup`, (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(() => {
            res.redirect(307, `/api/login`);
        }).catch((err) => {
            console.log(err);
            res.status(422).json(err.errors[0].message);
        });
    });

    app.post(`/api/login`, passport.authenticate(`local`, {
        failureRedirect: `/login`,
        failureFlash: `true`
    }), (req, res) => {
        res.json(`/`);
    });

    app.get(`/logout`, (req, res) => {
        req.logout();
        res.redirect(`/`);
    });

    // add profile picture and profile name
    app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
  
    // eslint-disable-next-line no-unused-vars
    app.post(`/profile/image`, upload.single(`image`), async (req, res) => {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        db.User.update({
            profileImg: result.secure_url
        },
        {
            where: {
                email: req.user.email
            }
        }).then(() => {
            req.session.passport.user.profileImg = result.secure_url;
            let user = req.user;
            req.login(user, function(err) {
                if(err){
                    console.log(err);
                }
            });
            res.redirect(`/profile`);
        });
    });

    app.post(`/api/save-animal-search`, (req, res) => {
        db.SavedAnimalSearch.create(
            {
                ...req.body,
                UserId: req.user.id
            }).then((result) => {
            if(result.affectedRows === 0){
                res.status(404).end();
            }else{
                res.json(`/profile`);
            }
        });
    });

    app.put(`/api/user-update`, (req, res) => {
        db.User.update({...req.body}, {
            where: {
                email: req.user.email
            }
        }).then(result => {
            if(result.changedRows === 0){
                res.status(404).end();
            }else{
                req.session.passport.user.firstName = req.body.firstName;
                req.session.passport.user.lastName = req.body.lastName;
                req.session.passport.user.mainAddress = req.body.mainAddress;
                req.session.passport.user.secondAddress = req.body.secondAddress;
                req.session.passport.user.city = req.body.city;
                req.session.passport.user.state = req.body.state;
                req.session.passport.user.zip = req.body.zipcode;
                let user = req.user;
                req.login(user, function(err) {
                    if(err){
                        console.log(err);
                    }
                });
                res.json(`/profile`);
            }
        });
    });
};

