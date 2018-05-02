const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', async (req, res, next) => {
    const paseador = req.body['paseador'];
    const perro = req.body['perro']
    const raza = req.body['raza'];
    if (paseador && perro && raza) {
        models.paseo.create({
            paseador: paseador,
            perro: perro,
            raza: raza
        }).then(paseo => {
            if (paseo) {
                res.json({
                    status: 1,
                    statusCode: 'paseo/created',
                    data: user.toJSON()
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
/* GET paseo listing.

    Example: /paseo/all

 */
router.get('/all', async (req, res, next) => {
    models.paseo
        .findAll()
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
                    data: user.toJSON()
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
router.get('/:perro', async (req, res, next) => {
    const perro = req.params.perro;
    if (paseador) {
        models.paseo.findOne({
            where: {
                perro: perro
            }
        }).then(paseo => {
            if (paseo) {
                res.json({
                    status: 1,
                    statusCode: 'paseo/found',
                    data: user.toJSON()
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



module.exports = router;
