'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('paseo', {
        paseador: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        perro: {
            type: DataTypes.,
            allowNull: false,
            isNumeric: true,
        },
        raza: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    }, 
    {
        classMethods: {
            associate: (models) => {
                perro.belongsTo(models.role);
            }
        },
        //paranoid: true,
    });
};
