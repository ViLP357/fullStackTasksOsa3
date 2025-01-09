const express = require('express')
const cors = require("cors")
var morgan = require("morgan")

const app = express()

app.use(cors())
app.use(express.json())


morgan.token("content",  (req) => {
  //console.log(req.body)
  return JSON.stringify(req.body)

})
//app.use(morgan('tiny'));
//var qualified = false // ei toiminut

app.use((req, res, next) => {
  if (req.method === "POST") {
    morgan(":method :url :status :res[content-length] - :response-time ms :content")(req, res, next)
    //qualified = false
  } else {
    morgan(":method :url :status :res[content-length] - :response-time ms")(req, res, next)
  }
});

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
  if (!person.number) {
    return response.status(400).json({
      error: "number missing"
    })
  }

  if (persons.some(personInList => personInList.name === person.name))  {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  person.id = Math.floor(Math.random() * 100).toString()
  persons = persons.concat(person)

  response.json(person)
})

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
//3.8 puhelinluettelon backend step8