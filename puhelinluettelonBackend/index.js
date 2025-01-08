const express = require('express')
const app = express()


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
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
//3.1 puhelinluettelon backend step1