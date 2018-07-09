const express = require('express');
const router = express.Router();
const models = require('../models');

//                     metodos POST

router.post('/', async (req, res, next) => {
    const nombre = req.body['nombre']
    const Chip = req.body['Chip'];
    const raza = req.body['raza'];
    if (nombre && Chip && raza) {
        models.perro.create({
            nombre: nombre,
            Chip: Chip,
            raza: raza
        }).then(perro => {
            if (perro) {
                res.json({
                    status: 1,
                    statusCode: 'perro/created',
                    data: perro.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'perro/error',
                    description: "No se pudo crear su mascota"
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
            statusCode: 'perro/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});


router.post('/assign', async (req, res, next) => {
    const nombre = req.body.nombre;
    const Chip = req.body.Chip;
    const raza = req.body.raza;
    if (nombre && Chip && raza) {
	models.perro.findOne({
            where: {
                Chip: Chip
            }
        }).then(perro => {
            if (perro) {
                models.paseo.findOne({
                    where: {
                        paseador: paseador
                    }
                }).then(classX => {
                    if (classX) {
                        perro.addClasses([classX]);
                        res.json({
                            status: 1,
                            statusCode: 'perro/paseo-assigned',
                            data: {
                                perro: perro.toJSON(),
                                'paseo': classX.toJSON()
                            }
                        });
                    } else {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'perro/paseo-not-found',
                            description: "No se pudo encotnrar el paseo"
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
                    statusCode: 'perro/not-found',
                    description: "No se pudo encontrar el perro"
                });
            }
        }).catch(error => {
            res.status(400).json({
                status: 0,
                statusCode: 'database/error',                description: error.toString()
            });
        });
    } else {
        res.status(400).json({
            status: 0,
            statusCode: 'perro/wrong-parameter',
            description: 'Parametros ingresados invalidos :('
        });
    }
});

// /* POST  perro listing.
//     Asigna un ID de un dueño que exista a un perro
//     Example: /2/user
//  */
// router.post('/:id/user', async (req, res, next) => {
//     const numerito = req.params.id;
//     const usuarioid = req.body.UserId;
//     console.log(req.body);
//     models.perro.findOne({
//         where: {
//             id: numerito
//         }
//     }).then(hayperro => {
//         if (!hayperro) res.sendStatus(404);
//         return hayperro.setUsers(usuarioid)
//     })
//     .then(res.send.bind(res))
//     .catch(next);
   
// });

//                               metodo DELETE 

/* DELETE  perro listing.
    Example: /delete/2
    Body: UserId       En el body recibe el id del usuario al que le corresponde 

 */
router.delete('/delete/:id', async (req, res, next) => {
    const idperro = req.params.id;
    const usuarioid = req.body.UserId;
    if (numerito) {
        models.perro.findOne({
            where: {
                id: numerito,
                UserId: usuarioid
            }
        }).then(perro => {
            if (perro) {
                res.json({
                    status: 1,
                    statusCode: 'perro/found',
                    data: perro.toJSON()
                });
                models.perro.destroy({ 
                    where: {
                        id: idperro
                    }
                })
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'perro/not-found',
                    description: 'Este id no corresponde a ninguna mascota en nuestra base de datos'
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
            statusCode: 'perro/wrong-id',
            description: 'Reingrese el id de la mascota que desea borrar'
        });
    }
});

//                                    metodos GET

/*--OBTENER PERRO DUEÑO--*/
// router.get('/buscar/:id', async(req, res, next) => {
//     models.perro
// });


/*------------*/


router.get('/all/:id', async (req, res, next) => {
    const iddueno = req.params.id;
    models.perro
        .findAll({
            where: {
                UserId: iddueno
            }
        })
        .then(perro => {
            if (perro) {
                res.json({
                    status: 1,
                    statusCode: 'perro/listing',
                    data: perro
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'perro/not-found',
                    description: 'No se ha encontrado información de su mascota!'
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





/* GET perro listing.

    Example: /nombre/firulais

 */
router.get('/:nombre', async (req, res, next) => {
    const nombre = req.params.nombre;
    if (nombre) {
        models.perro.findOne({
            where: {
                nombre: nombre
            }
        }).then(perro => {
            if (perro) {
                res.json({
                    status: 1,
                    statusCode: 'perro/found',
                    data: perro.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'perro/not-found',
                    description: 'Este nombre no corresponde a ninguna mascota en nuestra base de datos'
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
            statusCode: 'perro/wrong-nombre',
            description: 'Reingrese el nombre de la mascota que busca'
        });
    }
});


/* POST paseo listing.
    Asigna un perro(id), que exista, a un paseo
    Example: /1/perro
    Body: PerroId 3
 */
router.post('/:id/paseo', async (req, res, next) => {
    const idperro = req.params.id;
    const paseoId = req.body.PaseoId;
    console.log(req.body);
    models.perro.findOne({
        where: {
            id: idperro
        }
    }).then(perro => {
        if (!perro) res.sendStatus(404);
        return perro.addPaseo(paseoId)
    })
    .then(res.send.bind(res))
    .catch(next);
   
});





module.exports = router;
