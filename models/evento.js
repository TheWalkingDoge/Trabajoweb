'use strict';


module.exports = (sequelize, DataTypes) => {
    let evento = sequelize.define('evento', {
        idpaseador: {
            type: DataTypes.INTEGER,
            allowNull: true
        }   
    });
    return evento;
};