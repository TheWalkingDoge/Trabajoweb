const express = require('express');
const router = express.Router();
const models = require('../models');


/* DELETE  perro listing.
    Example: /delete/
    Body: nombreperro, email y password
    La idea es que en el frontend uno seleccion el nombre del perro  
 */
router.delete('/delete/', async (req, res, next) => {
    const nombreperro = req.body.nombreperro
    const email = req.body.email;
    const password = req.body.password; 
    models.user.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(userencontrado => {
        if(userencontrado) {
            const iddueno = userencontrado.id;
            models.perro.findOne({
                where: {
                nombre: nombreperro,
                UserId: iddueno
                }
            }).then(perroencontrado => {
                if(perroencontrado) {
                    perroencontrado.destroy()
                    .then(chao => {
                        res.json({
                            status: 1,
                            statusCode: 'perro/eliminado',
                            data: chao.toJSON()
                        });
                    });
                }
                else {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'perro/not-found',
                        description: 'El perro con ese nombre no existe'
                    });
                }
            });
        }
        else {
            res.status(400).json({
                status: 0,
                statusCode: 'paseador/not-found',
                description: 'No se encontro al user'
            });
        }
    });
});

//                                    metodos GET

/*--OBTENER PERROS DUEÑO--*/
// Muestra todos los perros del dueño
router.get('/all/', async (req, res, next) => {
    const email = req.headers.email;
    const password = req.headers.password;
    models.user.findOne({
            // attributes: [
            //     'id'
            // ],
            where: {
                email: email,
                password: password
            }
        }).then(userencontrado => {
            if(userencontrado){
                
                const iddueno = userencontrado.id;
                console.log(iddueno);
                models.perro.findAll({
                    where: {
                    UserId: iddueno
                    }
                }).then(perroencontrado => {
                    res.json({
                    status: 1,
                    statusCode: 'perros/found',
                    data: perroencontrado
                    });   
            });

            }
            else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseador/not-found',
                    description: 'No se encontro al user'
                });
            }
            }).catch(error => {
                res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
        });
    });
});

module.exports = router;
