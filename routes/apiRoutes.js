var db = require(`../models`);
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
  
    app.post(`/profile/image`, upload.single(`image`), async (req, res) => {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        db.User.update({
            profileImg: result.secure_url
        },
        {
            where: {
                email: req.user.email
            }
        });
    });
    
};

