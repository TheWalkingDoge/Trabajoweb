const express = require('express');
const router = express.Router();
const models = require('../models');

//                                          metodos POST

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


/*    POST   user listing 

        CREAR un PERRO desde el USER y al mismo tiempo asignarlo(id) al usuario(id)
        Example :  /create/dog/
        se cambio 'dog' por 'perro', porque daba un error de headers
        el mail y la pass se mandan por body OJO
        FUNCIONANDO - este es el que se conserva-
*/
router.post('/create/dog', async (req, res, next) => {
    const nombre = req.body['nombre']; 
    const Chip = req.body['Chip'];
    const raza = req.body['raza'];
    const email = req.body['email'];
    const password = req.body['password'];
    if (nombre && Chip && raza) {
        models.perro.create({
            nombre: nombre,
            Chip: Chip,
            raza: raza
        }).then(perro=>{
            if(perro) {
                res.json({
                    status: 1,
                    statusCode: 'perro/created',
                    data: perro.toJSON()
                });
                models.user.findOne({
                    where: {
                        email: email,
                        password: password
                    }
                }).then(user => {
                    user.addPerros(perro);
                })
            }
            else {
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
    }
    else {
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





module.exports = router;
