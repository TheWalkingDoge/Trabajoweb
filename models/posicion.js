'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const sequelize.define('posicion', {
    
        latitud1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        latitud2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        latitud3: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        longitud1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        longitud2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        longitud3: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }); 
    posicion.associate  = (models) => {
        posicion.hasOne(models.paseo, {
        });
    };
    return posicion;
};
