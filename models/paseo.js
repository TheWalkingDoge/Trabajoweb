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
            type: DataTypes.STRING,
            allowNull: false
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
