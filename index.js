// require the module
const express = require('express')
const courses = [
    { id: 1, name: "Programming in Java" },
    { id: 2, name: "Programming in C#" },
    { id: 3, name: "Backend Services + Oracle" }

]
// EXPRESS METHODS
const app = express()

// THIS METHOD WILL ALLOW FOR THE DATA TO BE IN JSON FORMAT DURING POST, PUT REQUEST!
app.use(express.json())




app.get("/", (req, res) => {
    res.send('Hello World')
})

// RETRIEVES COURSES EITHER AS ARRAY OF OBJECTS OR INDIVIUALLY IF ID IS PASSED
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send(`course with given ID was not found `) //404
    res.send(course)
})

// HANDLING HTTP POST REQUESTS TO CREATE A NEW COURSE AND ADD IT TO THE ARRAY OF COURSES

app.post('/api/courses', (req, res) => {
    // simple validation
    if (!req.body.name || req.body.name.length) {
        res.status(400).send('Name is required and minimum 3 character')
        return;
    }
    const course = {
        id: courses.length++,
        // remember we used express.json() -> middleware
        name: req.body.name
    }
    // pushes new course into the courses array!
    courses.push(course)
    // displays newly created course to courses array!
    res.send(course)
})


app.delete('/api/courses', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    courses.splice(courses.indexOf(course), 1)
})


// there are no if statements, there are get rquests

// ENVIRONMENT VARIABLE -> WILL USE THE PORT IF SPECIFIED, IF NOT IT WILL USE 3000
const PORT = process.env.PORT || 3000;
// to set port run command export PORT=5000 
app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})

