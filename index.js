// require the module
const Joi = require('joi')
//-> Joi is  a class

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

    const { error } = validateCourse(req.body);

    // validation was extracted to function
    if (error) {
        // this returns an user friendly error message
        res.status(400).send(error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        // remember we used express.json() -> middleware
        name: req.body.name
    }
    // pushes new course into the courses array!
    courses.push(course)
    // displays newly created course to courses array!
    res.send(course)
})

// UPDATING COURSES -> PUT UPDATES
app.put('/api/courses/:id', (req, res) => {
    // look up courses with given id
    const course = courses.find(crs => crs.id === parseInt(req.params.id))
    // if not exist return 404
    if (!course) res.status(404).send('invalid course')

    const { error } = validateCourse(req.body)

    if (error) {
        res.status(404).send(error.details[0].message)
    }

    //update course if tests pass
    course.name = req.body.name;
    // if other properties are given pass them here

    //return course to client
    res.send(course)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}


// there are no if statements, there are get rquests

// ENVIRONMENT VARIABLE -> WILL USE THE PORT IF SPECIFIED, IF NOT IT WILL USE 3000
const PORT = process.env.PORT || 3000;
// to set port run command export PORT=5000 
app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})

