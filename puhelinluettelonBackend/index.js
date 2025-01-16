require('dotenv').config()
const express = require('express')
const cors = require("cors")
var morgan = require("morgan")
const Person = require('./models/person')
const app = express()

const mongoose = require('mongoose')

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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    if (persons){
      response.json(persons)
    } else {
      response.status(404).end()
    }
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'Malformatted ID' });
  }
  Person.findById(id).then(person => {
    response.json(person)
  })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
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
})

app.use((req, res, next) => {
  console.log(req.body);
  next();
})

//const PORT = process.env.PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
//3.8 puhelinluettelon backend step8