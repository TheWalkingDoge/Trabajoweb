'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    let classX = sequelize.define('paseador', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false,
            not: ["[a-z]",'i'],
            isNumeric: true,
        },
        password: {
            type: DataTypes.STRING,
            validate: {
              notEmpty: {
                args: true,
                msg: 'Debes ingresar una clave'
              },
              len: {
                args: [6, 255],
                msg: 'La clave debe tener al menos 6 caracteres'
              }
            }
        }
    });
    paseador.associate= (models) => {
            paseador.belongsToMany(models.paseo, {
                through: 'PaseoClass',
                ass: 'paseos',
                unique: true
            });
    };
        //paranoid: true,
    return paseador;
};
