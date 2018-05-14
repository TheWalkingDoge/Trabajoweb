'use strict';


module.exports = (sequelize, DataTypes) => {
    let paseo = sequelize.define('paseo', {
        comentario: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    paseo.associate= (models) => {
        paseo.hasMany(models.perro, {
            as: 'paseoperro',
            unique: true
        });
        paseo.hasOne(models.posicion, {
            as: 'posicionapi',
            unique: true
        });

     } 
    return paseo;
};
