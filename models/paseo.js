'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    let paseo = sequelize.define('paseo', {
        paseador: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        perro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isNumeric: true,
        },
        raza: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    paseo.associate= (models) => {
            paseo.belongsTo(models.paseador, {
                through: 'PaseadorClass',
                ass: 'paseadores',
                unique: true
            });
            paseo.belongsTo(models.perro, {
                through: 'PerroClass',
                ass: 'perros',
                unique: true
            });
    };
        //paranoid: true,
    return perro;
};
