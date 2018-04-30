'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const sequelize.define('perro', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Chip: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isNumeric: true
        },
        raza: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    perro.associate = (models) => {
        perro.hasOne(models.user,{});
    };
    return perro;
};
