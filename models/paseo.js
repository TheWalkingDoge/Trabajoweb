'use strict';


module.exports = (sequelize, DataTypes) => {
    let paseo = sequelize.define('paseo', {
        comentario: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    
    // paseo.associate= (models) => {
    //     paseo.hasMany(models.perro, {
    //         as: 'perros',
    //         unique: true
    //     });
    //  } 
     
    return paseo;
};
