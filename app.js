// Require de los modulos necesarios
var http = require('http')
var path = require('path')
var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

// Se crea la app express
var app = express()

// Se indica donde estan las vistas y se indica que se va a usar ejs
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

// Se crea la variable local para las entradas, de modo que sea accesible para todas
// las vistas
var entries = []
app.locals.entries = entries

// Se usa Morgan para logg
app.use(logger('dev'))

// Completa la variable req.body si el usuario envia un formulario
app.use(bodyParser.urlencoded({ extended: false }))

// renderisa el index
app.get('/', function (request, response) {
  response.render('index')
})

// renderisa la pagina de agregar entradas
app.get('/new-entry', function (request, response) {
  response.render('new-entry')
})

// render metodo post de entradas
app.post('/new-entry', function (request, response) {
  // Controla que el titulo y el cuerpo no esten vacios
  if (!request.body.title || !request.body.body) {
    response.status(400).send('Entries must have a title and a body')
    return
  }
  // Agrega la nueva entrada
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  })
  response.redirect('/') // Direcciona al inicio para mostrar la entrada creada
})

// renderisa el 404
app.use(function (request, response) {
  response.status(404).render('404')
})

// Iniciamos el servidor
http.createServer(app).listen(3000, function () {
  console.log('Guestbook app started on port 3000.')
})
