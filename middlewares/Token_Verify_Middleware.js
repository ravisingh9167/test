//Third party package
const jwt = require('jsonwebtoken');

const Is_Auth_Middleware = async (req, res, next) => {
    
    const inputToken = req.header('Authorization');
       
    if (!inputToken) {
        const error = new Error('Token is not available');
        error.statusCode = 422;
        return next( error );
    }
    
    const token = inputToken.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
         
        if( error ) {
            const error = new Error('Invalid Token');
            error.statusCode = 422;
            return next( error );
        }//End of jwt.verify method
        next();
               
    });//End of Jwt method
    
       
};//End of function
    
    
module.exports = Is_Auth_Middleware;