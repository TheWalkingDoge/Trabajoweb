const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', async (req, res, next) => {
    const nombre = req.body['nombre']
    const Chip = req.body['Chip'];
    const raza = req.body['raza'];
    if (nombre && Chip && raza) {
        models.user.create({
            nombre: nombre,
            Chip: Chip,
            raza: raza
        }).then(perro => {
            if (perro) {
                res.json({
                    status: 1,
                    statusCode: 'perro/created',
                    data: user.toJSON()
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

/* GET users listing.

    Example: /users/all

 */
router.get('/all', async (req, res, next) => {
    models.user
        .findAll()
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

/* GET perro listing.

    Example: /nombre/firulais

 */
router.get('/:nombre', async (req, res, next) => {
    const nombre = req.params.nombre;
    if (id) {
        models.perro.findOne({
            where: {
                nombre: nombre
            }
        }).then(perro => {
            if (perro) {
                res.json({
                    status: 1,
                    statusCode: 'perro/found',
                    data: user.toJSON()
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

module.exports = router;
