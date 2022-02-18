let mongoose = require("mongoose")

const DBConn= ()=>{
    mongoose.connect(process.env.DB_CONN_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(() => console.log(`connected  to DB successfully`))
        .catch((error) => console.log(`something went wrong ${error.message}`));
}
    
module.exports= DBConn