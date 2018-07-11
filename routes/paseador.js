const express = require('express');
const router = express.Router();
const models = require('../models');

/*--POST CREAR PASEADOR--*/
// requiere nombre, apellido, telefono, password y email en el body
router.post('/', async (req, res, next) => {
    const nombre = req.body['nombre']
    const apellido = req.body['apellido'];
    const telefono = req.body['telefono'];
    const password = req.body['password'];
    const email = req.body['email'];
    if (nombre && apellido && telefono && password && email) {
        models.paseador.create({
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


router.post('/tomarpaseo', async (req, res, next) => {
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
            const iddueno = haypaseador.id;
            models.paseo.update({
                paseador: iddueno,
                estado: 1,
            }, {
                where: {
                    id: idpaseo, 
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

 
module.exports = router;