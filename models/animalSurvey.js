module.exports = function(sequelize, DataTypes) {
    const savedAnimalSearch = sequelize.define(`animalSurvey`, {
        species: {
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
        houseTrained: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        goodWithChildren: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        goodWithDogs: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        goodWithCats: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        distanceAway: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return savedAnimalSearch;
};