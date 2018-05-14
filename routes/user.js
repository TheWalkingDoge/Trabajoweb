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

/* POST  perro listing.
    Asigna un dueño(id), que exista, a un perro(id)
    Example: /2/perro
    ESTE METODO SE ELIMINA PUES NO TIENE SENTIDO ASIGNARLE OTRO USER AL PERRO, a menos que el user muera y se lo pasamos a otro loco ahah
 */
router.post('/:id/perro', async (req, res, next) => {
    const iddueno = req.params.id;
    const perroid = req.body.PerroId;
    console.log(req.body);
    models.user.findOne({
        where: {
            id: iddueno
        }
    }).then(usuario => {
        if (!usuario) res.sendStatus(404);
        return usuario.setPerros(perroid)
    })
    .then(res.send.bind(res))
    .catch(next);
   
});

/*    POST   user listing 

        CREAR un PERRO desde el USER y al mismo tiempo asignarlo(id) al usuario(id)
        Example :  /create/perro/1
        FUNCIONANDO - este es el que se conserva-
*/
router.post('/create/perro/:id', async (req, res, next) => {
    const iddueno = req.params.id;
    const nombre = req.body['nombre']; 
    const Chip = req.body['Chip'];
    const raza = req.body['raza'];
    if (nombre && Chip && raza) {
        models.perro.create({
            nombre: nombre,
            Chip: Chip,
            raza: raza
        })
        .then(perro => {
            if (perro) {
                res.json({
                    status: 1,
                    statusCode: 'perro/createrd',
                    data: perro.toJSON()
                });
                models.user.findOne({
                    where: {
                        id: iddueno
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

//              metodo DELETE 

/* DELETE  user listing.

    BORRAR un USER (debe borrar todos los perros asociados a el)
    Example: /delete/2
 */
router.delete('/delete/:id', async (req, res, next) => {
    const iddueno = req.params.id;
    const perroid = req.body.PerroId;
    
    if (numerito) {
        models.user.findOne({
            where: {
                id: iddueno
            }
        }).then(user => {
            if (user) {
                res.json({
                    status: 1,
                    statusCode: 'user/found',
                    data: user.toJSON()
                });
                models.user.destroy({ 
                    where: {
                        id: iddueno
                    }
                })
                models.perro.destroy({ 
                    where: {
                        perroid: perroid
                    }
                })
            } else {
                res.status(400).json({
                    status: 0,
                    statusCode: 'user/not-found',
                    description: 'Este id no corresponde a ningun usuario en nuestra base de datos'
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
            statusCode: 'user/wrong-id',
            description: 'Reingrese el id del usuario que desea borrar'
        });
    }
});

module.exports = router;
