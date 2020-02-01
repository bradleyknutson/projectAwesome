const bcrypt = require(`bcryptjs`);

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define(`User`, {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        profileImg: {
            type: DataTypes.STRING,
            isUrl: true
        },
        firstName: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        mainAddress: {
            type: DataTypes.TEXT,
            validate: {
                len: [1]
            }
        },
        secondAddress: {
            type: DataTypes.TEXT,
            validate: {
                len: [1]
            }
        },
        city: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        state: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        zipcode: {
            type: DataTypes.STRING,
            validate: {
                // eslint-disable-next-line quotes
                is: ["^[0-9]{5}(?:-[0-9]{4})?$",'i']
            }
        }
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(12),
            null
        );
    });

    User.associate = (models) => {
        User.hasMany(models.SavedAnimalSearch, {
            onDelete: `cascade`
        });
    };
    return User;
};