const express = require('express');
const router = express.Router();
const models = require('../models');





//                     metodos POST 

/*--Crear el paseo con el dueño */
// Permite al dueño crear un paseo 
//     Example: /paseo/create
//     Body: horario, nombreperro, email y password
router.post('/create', async (req, res, next) => {
    const horario = req.body['horario'];
    const nombreperro = req.body['nombreperro'];
    const email = req.body['email'];
    const password = req.body['password'];
    const dia = req.body['dia'];
    models.user.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(userencontrado => {
        if(userencontrado) {
            const iddueno = userencontrado.id;
            const nombredueno = userencontrado.nombre;
            const apellidodueno = userencontrado.apellido;
            const nombrecompleto = nombredueno +' '+ apellidodueno;
            models.perro.findOne({
                where: {
                nombre: nombreperro,
                UserId: iddueno
                }
            }).then(perroencontrado => {
                if(perroencontrado) {
                    models.paseo.create({
                        horario: horario,
                        dueno: iddueno,
                        dia: dia,
                        mascota: nombreperro
                    }).then(paseocreado => {
                        if(paseocreado){
                            paseocreado.addPaseito(perroencontrado);
                            paseocreado.update({
                                dueno: iddueno,
                                nombredueno: nombrecompleto,
                            }).then(chao => {
                                res.json({
                                    status: 1,
                                    statusCode: 'paseo/created',
                                    data: chao.toJSON(),
                                    description: "Paseo creado correctamente"
                                });
                            });
                        }
                        else {
                            res.status(400).json({
                                status: 0,
                                statusCode: 'paseo/error',
                                description: "No se pudo crear el paseo"
                            }); 
                        }
                    });
                }
                else {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'perro/error',
                        description: "No se encontro al perro"
                    });   
                }
            });
        }
        else {
            res.status(400).json({
                status: 0,
                statusCode: 'user/error',
                description: "No se pudo encontrar al usuario"
            });
        }
    });
});



/*--ESCRIBIR EL COMENTARIO FINAL DESPUES DEL PASEO */
//Hay que pasar el id del paseo para guardar el comentario
router.post('/:id/comentario', async (req,res,next) => {
    const idpaseo = req.params.id;
    const feedback = req.body.comentario;
    models.paseo.update({
        comentario: feedback,
    }, {
        where: {
            id: idpaseo
        }
    }).then(actualizado => {
        if(actualizado) {
            res.json({
                status: 1,
                statusCode: 'paseo/comentario/asignado'
            });
        }
        else {
            res.status(400).json({
            status: 0,
            statusCode: 'paseo/error',
            description: "No se pudo asignar el comentario al paseo"
            });
        }
    });
});
/*--FIN--*/

/*--CAMBIAR ESTADO AL PASEO A FINALIZADO */
//Esta ruta es de prueba por mientras que todavia no se puede finalizar un paseo. (se borrara mas adelante)
router.post('/:id/', async (req,res,next) => {
    const idpaseo = req.params.id;
    models.paseo.update({
        estado: 2,
    }, {
        where: {
            id: idpaseo
        }
    }).then(actualizado => {
        if(actualizado) {
            res.json({
                status: 1,
                statusCode: 'paseo/terminado'
            });
        }
        else {
            res.status(400).json({
            status: 0,
            statusCode: 'paseo/error',
            description: "No se pudo terminar el paseo"
            });
        }
    });
});
/*-------------------------------*/





//                     metodos GET 
/* GET paseos disponibles.

    Example: /paseo/disponibles

 */
router.get('/all/disponibles', async (req, res, next) => {
    //const ventana = req.params.horario;
    models.paseo.findAll({
        where: {
            estado: 0
        }
    }).then(paseo => {
            if (paseo) {
                res.json({
                    status: 1,
                    statusCode: 'paseo/listing',
                    data: paseo
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseo/not-found',
                    description: 'No se ha encontrado información de este paseo'
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


/* GET Todos los paseos (creados, tomados y finalizdos).
    Para fines de estudio
    Example: /paseo/all

 */
router.get('/all/', async (req, res, next) => {
    //const ventana = req.params.horario;
    models.paseo.findAll({})
    .then(paseo => {
            if (paseo) {
                res.json({
                    status: 1,
                    statusCode: 'paseo/listing',
                    data: paseo
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseo/not-found',
                    description: 'No se ha encontrado información de este paseo'
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


/* GET PASEOS DUEÑO FINALIZADOS.

    Example: /id/78

 */
router.get('/dueno/finalizados', async (req, res, next) => {
    const email = req.headers.email;
    const password = req.headers.password;
    models.user.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(userencontrado => {
        if(userencontrado){
            const iddueno = userencontrado.id;
            models.paseo.findAll({
                where: {
                    dueno: iddueno,
                    estado: 2
                }
            }).then(paseoencontrado => {
                if(paseoencontrado){
                    res.json({
                        status: 1,
                        statusCode: 'paseo/listing',
                        data: paseoencontrado
                    });
                }
                else {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'user/error',
                        description: "No hay paseos finalizados"
                    });
                }
            });
        }
        else {
            res.status(400).json({
                status: 0,
                statusCode: 'user/error',
                description: "No se pudo encontrar al usuario"
            });
        }
    });
});


/* GET PASEOS PASEADOR FINALIZADOS.

 */
router.get('/paseador/finalizados', async (req, res, next) => {
    const email = req.headers.email;
    const password = req.headers.password;
    models.paseador.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(paseadorencontrado => {
        if(paseadorencontrado){
            const idpaseador = paseadorencontrado.id;
            models.paseo.findAll({
                where: {
                    paseador: idpaseador,
                    estado: 2
                }
            }).then(paseoencontrado => {
                if(paseoencontrado){
                    res.json({
                        status: 1,
                        statusCode: 'paseo/listing',
                        data: paseoencontrado
                    });
                }
                else {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'user/error',
                        description: "No hay paseos finalizados"
                    });
                }
            });
        }
        else {
            res.status(400).json({
                status: 0,
                statusCode: 'user/error',
                description: "No se pudo encontrar al usuario"
            });
        }
    });
});

/* GET Muestra el paseo que el paseador ha tomado(Unico).

    Example: /id/78

 */
router.get('/paseador/pendiente', async (req, res, next) => {
    const email = req.headers.email;
    const password = req.headers.password;
    models.paseador.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(paseadorencontrado => {
        if(paseadorencontrado){
            const idpaseador = paseadorencontrado.id;
            models.paseo.findAll({
                where: {
                    paseador: idpaseador,
                    estado: 1
                }
            }).then(paseoencontrado => {
                if(paseoencontrado){
                    res.json({
                        status: 1,
                        statusCode: 'paseo/listing',
                        data: paseoencontrado
                    });
                }
                else {
                    res.status(400).json({
                        status: 0,
                        statusCode: 'user/error',
                        description: "No hay paseos finalizados"
                    });
                }
            });
        }
        else {
            res.status(400).json({
                status: 0,
                statusCode: 'user/error',
                description: "No se pudo encontrar al usuario"
            });
        }
    });
});


/*METODO DE PRUEBA PARA RETORNAR EL NOMBRE DEL PERRO QUE SE ENCUENTRA EN EL PASE
    Cuando se encuentra el paseo, la funcion getPaseito() retorna un objeto con mucha info, pero 
    hayperritos[0].nombre retorna solo el nombre del perro, asi el frontend trabaja con los datos precisos.

*/

router.get('/all/:id', async (req, res, next) => {
    //const ventana = req.params.horario;
    const idpaseo = req.params.id;
    models.paseo.findOne({
        where: {
            id: idpaseo
        }
    }).then(paseo => {
            if (paseo) {
                paseo.getPaseito(
                    {
                    attributes: [
                        'nombre','raza'
                    ]
                }
            ).then(hayperritos => {
                    //console.log('abajo va el indice 0 del hayperritos');
                    //console.log(hayperritos[{nombre}]);
                    //console.log(hayperritos[0].nombre);
                    res.json({
                        status: 1,
                        statusCode: 'paseo/listing',
                        data: hayperritos[0].nombre, paseo 
                    });
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseo/not-found',
                    description: 'No se ha encontrado información de este paseo'
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
