'use strict';


module.exports = (sequelize, DataTypes) => {
    let paseo = sequelize.define('paseo', {
        comentario: {
            type: DataTypes.STRING,
            allowNull: true
        },
        horario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 0 
        },
        paseador: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dueno: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mascota: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombrepaseador: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nombredueno: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });
    
    paseo.associate= (models) => {
        paseo.belongsToMany(models.perro, {
            as: 'paseito',
            through: 'evento',
        });
     } 
     
    return paseo;
};
