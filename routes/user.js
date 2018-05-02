const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', async (req, res, next) => {
    const nombre = req.body['nombre'];
    const apellido = req.body['apellido']
    const telefono = req.body['telefono'];
    const password = req.body['password'];
    const email= req.body['email'];
    if (nombre && apellido && telefono && password && email) {
        models.user.create({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            password: password,
            email: email
        }).then(user => {
            if (user) {
                res.json({
                    status: 1,
                    statusCode: 'user/created',
                    data: user.toJSON()
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'user/error',
                    description: "No se pudo crear al usuarior"
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
            statusCode: 'user/wrong-body',
            description: 'The body is wrong! :('
        });
    }
});
/* GET users listing.

    Example: /users/all

 */
router.get('/all', async (req, res, next) => {
    models.user
        .findAll()
        .then(users => {
            if (users) {
                res.json({
                    status: 1,
                    statusCode: 'users/listing',
                    data: users
                });
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'users/not-found',
                    description: 'There\'s no user information!'
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

/* GET user listing.
    Example: /user/lindorfo
 */
router.get('/:nombre', async (req, res, next) => {
    const nombre = req.params.nombre;
    if (nombre) {
        models.user.findOne({
            where: {
                nombre: nombre
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
                    description: 'El nombre que ha ingresado no corresponde a ningún usuario'
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
            statusCode: 'user/wrong-nombre',
            description: 'Vuelva a escribir un nombre'
        });
    }
});

/* GET users listing.

    Example: /users/max@zl.cl

 */
router.get('/email/:email', async (req, res, next) => {
    const email = req.params.email;
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

/* GET users listing.

    Example: /users?email=max@zl.cl

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
