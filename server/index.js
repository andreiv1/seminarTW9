let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
const router = require('./routes/tasks.js')
require('dotenv').config();
let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)


app.use((err,req, res, next) => {
    res.status(500).json({"message": "Internal Server Error"})
})
app.set("port",process.env.PORT || 8080)

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'))
})