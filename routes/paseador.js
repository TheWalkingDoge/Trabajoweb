const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', async (req, res, next) => {
    const nombre = req.body['nombre']
    const apellido = req.body['apellido'];
    const telefono = req.body['telefono'];
    const password = req.body['password'];
    if (nombre && apellido && telefono && password) {
        models.paseador.create({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            password: password,
            estado: 0
        }).then(paseador => {
            if (paseador) {
                res.json({
                    status: 1,
                    statusCode: 'paseador/created',
                    data: paseador.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseador/error',
                    description: "No se pudo crear al paseador"
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
            statusCode: 'paseador/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});

router.post('/assign', async (req, res, next) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const password = req.body.paseador;
    const estado = req.body.estado;
    if (nombre && apellido && telefono && password && estado) {
	models.paseador.findOne({
            where: {
                telefono: telefono
            }
        }).then(paseador => {
            if (paseador) {
                models.paseo.findOne({
                    where: {
                        id: id
                    }
                }).then(classX => {
                    if (classX) {
                        paseador.addClasses([classX]);
                        res.json({
                            status: 1,
                            statusCode: 'paseador/paseo-assigned',
                            data: {
                                paseador: paseador.toJSON(),
                                'paseo': classX.toJSON()
                            }
                        });
                    } else {
                        res.status(400).json({
                            status: 0,
                            statusCode: 'paseador/paseo-not-found',
                            description: "No se pudo encontrar el paseo"
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
                    statusCode: 'paseador/not-found',
                    description: "No se pudo encontrar el paseador"
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
            statusCode: 'paseador/wrong-parameter',
            description: 'Los parametros ingresador son incorrectos :('
        });
    }
});
/* GET paseador listing.

    Example: /paseador/all

 */
router.get('/all', async (req, res, next) => {
    models.paseador
        .findAll()
        .then(paseador => {
            if (paseador) {
                res.json({
                    status: 1,
                    statusCode: 'paseador/listing',
                    data: paseador
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseador/not-found',
                    description: 'No se ha encontrado información de este paseador!'
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
router.get('/nombre/:nombre', async (req, res, next) => {
    const nombre = req.params.nombre;
    if (nombre) {
        models.paseador.findOne({
            where: {
                nombre: nombre
            }
        }).then(paseador => {
            if (paseador) {
                res.json({
                    status: 1,
                    statusCode: 'paseador/found',
                    data: paseador.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseador/not-found',
                    description: 'El nombre que ha ingresado no corresponde a ningún paseador'
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
            statusCode: 'paseador/wrong-nombre',
            description: 'Vuelva a escribir un nombre'
        });
    }
});
/* GET paseador listing.

    Example: /paseador/98765432

 */
router.get('/telefono/:telefono', async (req, res, next) => {
    const telefono = req.params.telefono;
    if (telefono) {
        models.paseador.findAll({
            attributtes: [
                'nombre'
            ],
            where: {
                telefono: telefono
            }
        }).then(paseador => {
            if (paseador) {
                res.json({
                    status: 1,
                    statusCode: 'paseador/found',
                    data: paseador.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseador/not-found',
                    description: 'El telefono que ha ingresado no corresponde a ningún paseador'
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
            statusCode: 'paseador/wrong-telefono',
            description: 'Vuelva a escribir un telefono valido'
        });
    }
});

router.get('/apellido/:apellido', async (req,res,next) => {
    const apellido = req.params.apellido;
    if (apellido) {
        models.paseador.findOne({
            where: {
                apellido: apellido
            }
        }).then(paseador => {
            if (paseador) {
                res.json({
                    status: 1,
                    statusCode: 'paseador/found',
                    data: paseador.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseador/not-found',
                    description: 'El apellido que ha ingresado no corresponde a ningún paseador'
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
            statusCode: 'paseador/wrong-apellio',
            description: 'Vuelva a escribir un apellido valido'
        });
    }
}); 




module.exports = router;
