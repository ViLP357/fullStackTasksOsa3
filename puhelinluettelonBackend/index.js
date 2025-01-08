const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
   id: "1",
   name: "Arto Hellas",
   number: "040-123456"
  },
  {
   id: "2",
   name: "Ada Lovelace",
   number: "39-44-5323523"
  } 
 ]


// const d = new Date()

app.get('/', (request, response) => {
  const d = new Date()
  response.send(`<h2>Phonebook has info for ${persons.length} people</h2>
    <p>${Date(d.setFullYear(d.getFullYear()).toString())}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
  response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const person = request.body
  if (!person.name) {
    return response.status(400).json({
      error: "name missing"
    })
  }
  person.id = Math.floor(Math.random() * 100)
  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
//3.5 puhelinluettelon backend step5