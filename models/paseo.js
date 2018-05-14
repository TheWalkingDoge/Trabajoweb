'use strict';


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
                as: 'paseadores',
                unique: true
            });
            paseo.hasMany(models.perro, {
                as: 'perros',
                unique: true
            });
    };
        //paranoid: true,
    return paseo;
};
