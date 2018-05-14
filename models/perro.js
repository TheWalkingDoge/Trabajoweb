'use strict';

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

    //    ESTO SE BORRA (?) YA QUE LA ASOCIACION CON USUARIO YA ESTA TERMINADA EN models/user.js Y FUNCIONA
    // perro.associate= (models) => {
     
    //         perro.belongsTo(models.user, {
    //             through: 'UserClass',
    //             as: 'users',
    //             unique: true
    //         });
    // };
    return perro;
};
