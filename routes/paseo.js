const express = require('express');
const router = express.Router();
const models = require('../models');

//                     metodos POST 

router.post('/', async (req, res, next) => {
    const comentario = req.body['comentario'];
    const estado = 'disponible';
    const horario = req.body['horario'];


    if (estado && estado &&!comentario) {
        models.paseo.create({
            comentario: comentario,
            estado: estado,
            horario: horario


        }).then(paseo => {
            if (paseo) {
                res.json({
                    status: 1,
                    statusCode: 'paseo/created',
                    data: paseo.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseo/error',
                    description: "No se pudo crear el paseo"
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
            statusCode: 'paseo/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});

/* POST paseo listing.
    Asigna un paseador(id),que exista, a un paseo
    Example: /4/paseador
    Body: PaseadorId 4
 */

/*--NUEVO ASIGNAR PASEADOR A PASEO--*/
router.post('/:id/paseador', async (req, res, next) => {
    const idpaseo = req.params.id;
    const paseadorId = req.body.PaseadorId;
    models.evento.findOne({
        where: {
            paseoid: idpaseo,
            perroId: {
                $ne: null
            }
        }
    }).then(hayevento => {
        if (hayevento) {
            models.evento.update({
                idpaseador: paseadorId,
            }, {
                where: {
                    paseoId: idpaseo,
                    perroId: {
                        $ne: null
                    }
                    
                }
            
            })
        }
    })
    .then(res.send.bind(res))
    .catch(next);

});
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
router.get('/all/:horario', async (req, res, next) => {
    const ventana = req.params.horario;
    models.paseo.findOne({
        where: {
            horario: 'ventana',
            estado: 'disponible'
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
        models.user.findOne({
            where: {
                paseador: paseador
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
router.get('/id/:id', async (req, res, next) => {
    const id = req.params.id;
    if (id) {
        models.paseo.findOne({
            where: {
                id: id
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
                    description: 'No hay ningun paseo al que le corresponda este ID'
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

module.exports = router;
