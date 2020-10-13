const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

app.use(cors())




morgan.token('body', (req, res) => {
    
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return null
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Adda Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const info = `Phonebook has info for ${persons.length} people`
    const date = Date()
    res.send(`<p>${info}</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
  
    res.status(204).end()
  })


  /*const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }*/
  
  app.post('/api/persons', (req, res) => {
    const body = req.body
   
    if (!body.name || !body.number ) {
        return res.status(400).json({
            error: 'content is missing'
        })
    }
    if (!persons.every(p => p.name !== body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    
  
    const person = {
      id: Math.floor(Math.random() * 30),
      name: body.name,
      number: body.number,
    }
  
    persons = persons.concat(person)
  
    res.json(person)
  })
const PORT = process.env.Port || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})