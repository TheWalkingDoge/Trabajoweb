'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('posicion', {
        id: {
            type: DataTypes.UUID,
            defaultvalue: sequelize.UUIDV1,
        },
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
        },
        

    }, {
        classMethods: {
            associate: (models) => {
                posicion.belongsTo(models.paseo);
            }
        },
        //paranoid: true,
    });
};
