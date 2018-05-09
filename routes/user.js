const express = require('express');
const router = express.Router();
const models = require('../models');
const passport = require('passport');

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


//////////

router.get('/', function(req, res, next) {
    User
    .findAll()
    .then(function(users) {
      res.render('register', { title: 'User Register', users:users });
    });
  });
  
  
  router.get('/create', function(req, res, next) {
    User.create({'username':'Username', 'password':'Password', 'rol':'rol'})
      .then(function(user) {
        console.log(user);
      });
    var date = new Date();
  
    res.send(date);
  });
  
  router.get('/login', function(req, res, next) {
     if(req.isAuthenticated()) res.redirect('/');
     res.render('signin', {title: 'Sign In'});
  });
  
  router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/register',
    failureFlash: true
  }));
  
  router.get('/register', function(req, res, next) {
    res.redirect('/users/');
  });
  
  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });
  
  router.get('/:user_id/destroy', function(req, res, next) {
    User.destroy({
      where: {id: req.params.user_id}
    }).then(function() {
        res.redirect('/users');
      });
  });
  
  router.get('/:user_id/profile', function(req, res, next) {
    User
    .find({id: req.params.user_id })
    .then(function(user){
      res.send(user);
    });
  });
  
  
  router.post('/register', function(req, res, next) {
    User.find({username : req.body.username})
    .then(function(user){
        if (!user){
          User.create(req.body)
          .then(function(user) {
              passport.authenticate('local')(req, res, function () {
                res.redirect('/');
              });   
          });
        } else {
          console.log("usuario repetido");
          res.redirect('/users/register');;
        }
    });
  });


module.exports = router;
