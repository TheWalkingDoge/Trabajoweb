'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    let perro =  sequelize.define('perro', {
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
    perro.associate= (models) => {
            perro.belongsTo(models.paseo, {
                through: 'PerroClass',
                ass: 'perros',
                unique: true
            });
            perro.belongsTo(models.user, {
                through: 'UserClass',
                ass: 'Users',
                unique: true
            });
    };
    return perro;
};
