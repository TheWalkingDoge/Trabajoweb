const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', (req, res, next) => {
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
/* GET users listing.

    Example: /users/all

 */
router.get('/all', (req, res, next) => {
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
router.get('/:nombre', (req, res, next) => {
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
