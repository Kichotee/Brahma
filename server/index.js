
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Journal = require('./models/journal')


const dbURI = "mongodb+srv://tee:Delicious18.@cluster0.25za4pj.mongodb.net/journals?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    app.listen(3001)
    ;
}).catch(err => {
    console.log(err);
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/add-blog', (req, res) => {
    const journal = new Journal({
        title: 'new blog',
        body: ' lorem ipsum dolor sit amet lorem ipsum'
    })
    journal.save().then(result => {
        res.send(result)
    }).catch(err => { console.log(err); })
})
