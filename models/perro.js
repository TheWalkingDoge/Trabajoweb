'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('perro', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Chip: {
            type: DataTypes.INTEGER,
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
