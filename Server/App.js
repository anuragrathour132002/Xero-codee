const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const { MONGOURI } = require('./config/keys')

// mongoose.set('strictQuery', true);
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
    console.log("Mongo connected:")
})

mongoose.connection.on('error', (err) => {
    console.log("error connected:", err)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./models/User')
require('./models/DataModel')
require('./models/SelfHosting')
app.use(require('./routes/Auth'))
app.use(require('./routes/Company'))
// app.use(require('./routes/Hosting'))

app.listen(PORT, () => {
    console.log("server is running on ", PORT)
})
