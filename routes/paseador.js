const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', (req, res, next) => {
    const nombre = req.body['nombre']
    const apellido = req.body['apellido'];
    const telefono = req.body['telefono'];
    const password = req.body['password'];
    const email = req.body['email'];
    if (nombre && apellido && telefono && password) {
        models.user.create({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            password: password,
            email: email
        }).then(paseador => {
            if (paseador) {
                res.json({
                    status: 1,
                    statusCode: 'paseador/created',
                    data: user.toJSON()
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
/* GET paseador listing.

    Example: /paseador/all

 */
router.get('/all', (req, res, next) => {
    models.user
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

    Example: /paseador/lindorfo@laleydelaselva.cl

 */
router.get('/:email', (req, res, next) => {
    const email = req.params.email;
    if (email) {
        models.paseador.findOne({
            where: {
                email: email
            }
        }).then(paseador => {
            if (paseador) {
                res.json({
                    status: 1,
                    statusCode: 'paseador/found',
                    data: user.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'paseador/not-found',
                    description: 'El mail que ha ingresado no corresponde a ningún paseador'
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
            statusCode: 'paseador/wrong-email',
            description: 'Reingrese el email!'
        });
    }
});
/* GET paseador listing.

    Example: /paseador/lindorfo

 */
router.get('/:nombre', (req, res, next) => {
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
                    data: user.toJSON()
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
router.get('/:telefono', (req, res, next) => {
    const telefono = req.params.telefono;
    if (telefono) {
        models.paseador.findOne({
            where: {
                telefono: telefono
            }
        }).then(paseador => {
            if (paseador) {
                res.json({
                    status: 1,
                    statusCode: 'paseador/found',
                    data: user.toJSON()
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

/* GET users listing.

    Example: /users?email=max@zl.cl

 */
/*
router.get('/', (req, res, next) => {
    const email = req.query.email;
    if (email) {
        models.user.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                res.json({
                    status: 1,
                    statusCode: 'user/found',
                    data: user.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'user/not-found',
                    description: 'The user was not found with the email'
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
            statusCode: 'user/wrong-email',
            description: 'Check the email!'
        });
    }
});
*/


module.exports = router;