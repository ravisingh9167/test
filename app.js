let express = require("express")
let app = express()
require('./env')

//Setting For input using body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Enable Cors
const cors = require('cors');
app.use(cors());

//Importing Custom Modules
require('./config/DBConnection')()
require('./utils/allRoutes')(app)

app.listen(process.env.PORT, ()=>{
    console.log(`App is Listening to Port: ${process.env.PORT}`)
})

module.exports= app