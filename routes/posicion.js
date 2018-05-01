const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', async (req, res, next) => {
    const latitud1 = req.body['latitud1'];
    const latitud2 = req.body['latitud2']
    const latitud3 = req.body['latitud3'];
    const longitud1 = req.body['longitud1'];
    const longitud2 = req.body['longitud2'];
    const longitud3 = req.body['longitud3'];
    if (latitud1 && latitud2 && latitud3 && longitud1 && longitud2 && longitud3) {
        models.user.create({
            latitud1: latitud1,
            latitud2: latitud2,
            latitud3: latitud3,
            longitud1: longitud1,
            longitud2: longitud2,
            longitud3: longitud3
        }).then(posicion => {
            if (posicion) {
                res.json({
                    status: 1,
                    statusCode: 'posicion/created',
                    data: user.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'posicion/error',
                    description: "No se pudo crear la posicion"
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
            statusCode: 'posicion/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});
module.exports = router;
