let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
const router = require('./routes/tasks')
require('dotenv').config();
let app = express()
require('./models/task')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)

const sequelize = require('./sequelize');

app.use((err,req, res, next) => {
    res.status(500).json({"message": "Internal Server Error"})
})
app.set("port",process.env.PORT || 8080)

app.listen(app.get('port'), async () => {
    console.log('Server listening on port ' + app.get('port'));

    try{
        await sequelize.authenticate();
        console.log('Connected to database!')
    }
    catch(err){
        console.log('Unable to connect to database: ', err);
    }
})