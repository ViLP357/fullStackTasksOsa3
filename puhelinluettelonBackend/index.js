require('dotenv').config()
const express = require('express')
const cors = require("cors")
var morgan = require("morgan")
const Person = require('./models/person')
const app = express()

//const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.static("dist"))

morgan.token("content",  (req) => {
  return JSON.stringify(req.body)
})

app.use((req, res, next) => {
  if (req.method === "POST") {
    morgan(":method :url :status :res[content-length] - :response-time ms :content")(req, res, next)
    //qualified = false
  } else {
    morgan(":method :url :status :res[content-length] - :response-time ms")(req, res, next)
  }
})

app.get('/', (request, response) => {
  response.send('<p>Phonebook</p>')
})

app.get('/info', (request, response) => {
  const d = new Date()
  
  response.send(`<h2>Phonebook has info for ${persons.length} people</h2>
    <p>${Date(d.setFullYear(d.getFullYear()).toString())}</p>`)
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    if (persons){
      response.json(persons)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    response.json(person)
  })
  .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => { 
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(person => {
      if (person) {
      response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body
  
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content mising'})
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  //server kaatui, ei toimi
  console.log("test")
  const body = request.body
  //console.log(body)
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {number: request.params.numeber})
    .then(updatetPerson => {
      response.json(updatetPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use((req, res, next) => {
  console.log(req.body);
  next();
})

app.use(errorHandler)

//const PORT = process.env.PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
//3.8 puhelinluettelon backend step8