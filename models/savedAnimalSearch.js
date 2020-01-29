/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    const SavedAnimalSearch = sequelize.define(`SavedAnimalSearch`, {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        good_with_children: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        good_with_dogs: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        good_with_cats: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },
        emailOn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    SavedAnimalSearch.associate = (models) => {
        SavedAnimalSearch.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return SavedAnimalSearch;
};