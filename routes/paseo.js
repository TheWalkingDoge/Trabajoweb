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
                        dia: dia
                    }).then(paseocreado => {
                        if(paseocreado){
                            paseocreado.addPaseito(perroencontrado);
                            paseocreado.update({
                                dueno: iddueno,
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



/*--TOMAR PASEO DESDE PASEADOR--*/
// En el body debe venir idpaseo, email y password
router.post('/paseador/tomarpaseo', async (req, res, next) => {
    const idpaseo = req.body.idpaseo;
    const email = req.body.email;
    const password = req.body.password;
    models.paseador.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(haypaseador => {
        if (haypaseador) {
            const iddueno = userencontrado.id;
            models.paseo.update({
                idpaseador: iddueno,
            }, {
                where: {
                    paseoId: idpaseo, 
                }
            
            }).then(tomado => {
                res.json({
                    status: 1,
                    statusCode: 'paseo/tomado',
                    data: tomado
                });
            });
        }
        else {
            res.status(400).json({
                status: 0,
                statusCode: 'paseador/not-found',
                description: 'No se encontro al paseador'
            });
        }
    })
    .catch(next);

});

/*FIN*/


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


    // models.paseo.findOne({
    //     where: {
    //         id: idpaseo
    //     }
    // }).then(haypaseo => {
    //     if(haypaseo) {
    //         models.paseo.Update({
    //             comentario: feedback,
    //         }, {
    //             where: {
    //                 id: idpaseo
    //             }
    //         }).then(listopaseo) => {
    //             if(listopaseo) {
    //                 res.json({
    //                     status: 1,
    //                     statusCode: 'paseo/comentario/asignado',
    //                     data: listopaseo.toJSON()
    //                 });
    //             }
    //             else {
    //                 res.status(400).json({
    //                     status: 0,
    //                     statusCode: 'paseo/error',
    //                     description: "No se pudo asignar el comentario al paseo"
    //                 });
    //             }

    //         }
    //     }
    // })
});
/*--FIN--*/


/* POST paseo listing.
    Asigna un paseador(id),que exista, a un paseo
    Example: /4/paseador
    Body: PaseadorId 4
 */

/*--NUEVO ASIGNAR PASEADOR A PASEO--*/
// router.post('/:id/paseador', async (req, res, next) => {
//     const idpaseo = req.params.id;
//     const paseadorId = req.body.PaseadorId;
//     models.evento.findOne({
//         where: {
//             paseoid: idpaseo,
//             perroId: {
//                 $ne: null
//             }
//         }
//     }).then(hayevento => {
//         if (hayevento) {
//             models.evento.update({
//                 idpaseador: paseadorId,
//             }, {
//                 where: {
//                     paseoId: idpaseo,
//                     perroId: {
//                         $ne: null
//                     }
                    
//                 }
            
//             })
//         }
//     })
//     .then(res.send.bind(res))
//     .catch(next);

// });
/*--FIN--*/



/* POST paseo listing.
    Asigna un perro(id), que exista, a un paseo
    Example: /1/perro
    Body: PerroId 3
 */
// router.post('/:id/perro', async (req, res, next) => {
//     const idpaseo = req.params.id;
//     const perroId = req.body.PerroId;
//     console.log(req.body);
//     models.paseo.findOne({
//         where: {
//             id: idpaseo
//         }
//     }).then(haypaseo => {
//         if (!haypaseo) res.sendStatus(404);
//         return haypaseo.addPerros(perroId)
//     })
//     .then(res.send.bind(res))
//     .catch(next);
   
// });


router.post('/:id/perro', async (req, res, next) => {
    const idpaseo = req.params.id;
    const perroId = req.body.PerroId;
    models.paseo.findOne({
        where: {
            id: idpaseo
        }
    }).then(haypaseo => {
        if(haypaseo){
            models.perro.findOne({
                where: {
                    id: perroId
                }
            }).then(perro => {
                if(perro) {
                    perro.addPerrito(haypaseo);
                    res.json({
                        status: 1,
                        statusCode: 'paseo/perro/asignado',
                        data: haypaseo.toJSON()
                    });
                }
                // perro.addPaseos(haypaseo);
            })
        }
        else {
            res.status(400).json({
                status: 0,
                statusCode: 'perro/error',
                description: "No se pudo asignar el paseo a la mascota"
            });
        }
    })
    
});



/*---------------------------- */

//                     metodos GET 
/* GET paseo listing.

    Example: /paseo/all

 */
router.get('/all/', async (req, res, next) => {
    //const ventana = req.params.horario;
    models.paseo.findOne({
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




/* GET paseador listing.

    Example: /paseador/lindorfo

 */
router.get('/:paseador', async (req, res, next) => {
    const paseador = req.params.paseador;
    if (paseador) {
        models.paseo.findOne({
            where: {
                paseadorId: paseador
            }
        }).then(paseo => {
            if (paseo) {
                res.json({
                    status: 1,
                    statusCode: 'paseo/found',
                    data: paseo.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseo/not-found',
                    description: 'No hay ningun paseo asignado a este paseador'
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'paseo/wrong-paseador',
            description: 'Ingrese otro paseador!'
        });
    }
});


/* GET perro listing.

    Example: /perro/dolar 

 */
router.get('/perro/:perro', async (req, res, next) => {
    const perro = req.params.perro;
    if (perro) {
        models.paseo.findOne({
            where: {
                perro: perro
            }
        }).then(paseo => {
            if (paseo) {
                res.json({
                    status: 1,
                    statusCode: 'paseo/found',
                    data: paseo.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseo/not-found',
                    description: 'No hay ningun paseo asignado a este perro'
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'paseo/wrong-perro',
            description: 'Ingrese otro perro!'
        });
    }
});

/* GET id listing.

    Example: /id/78

 */
router.get('/dueno/:dueno', async (req, res, next) => {
    const id = req.params.dueno;
    if (id) {
        models.paseo.findAll({
            where: {
                dueno: id
            }
        }).then(paseo => {
            if (paseo) {
                res.json({
                    status: 1,
                    statusCode: 'paseo/found',
                    data: paseo
                     // data: paseo.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseo/not-found',
                    description: 'No hay ningun paseo al que le corresponda este Usuario'
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',
                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'paseo/wrong-perro',
            description: 'Ingrese otro ID!'
        });
    }
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
            )
                .then(hayperritos => {
                    //console.log('abajo va el indice 0 del hayperritos');
                    //console.log(hayperritos[{nombre}]);
                    //console.log(hayperritos[0].nombre);
                    res.json({
                        status: 1,
                        statusCode: 'paseo/listing',
                        data: hayperritos[0].nombre
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
