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
    perro.associate= (models) => {
     
            perro.belongsTo(models.user, {
                through: 'UserClass',
                as: 'Users',
                unique: true
            });
    };
    return perro;
};
