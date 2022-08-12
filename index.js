const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Broswer can execute only JS",
        date: "2022-05-30T18:39:34.091Z",
        important: true
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    },
    {
        id: 4,
        content: "Postman is a good tool for testing a REST-api",
        date: "2022-05-30T20:24:16.341Z",
        important: true
    }
]

const generateId = () => {
    const maxId = note.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

const unknownEndpoint = (req, res) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.get('/', (req, res) => {
    res.send('<h1>Hello Maia!</h1>')
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if (note) res.json(note)
    else res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id !== id)

    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)
    res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})