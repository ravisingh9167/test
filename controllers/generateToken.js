const jwt = require('jsonwebtoken');

exports.getToken= async (req, res)=>{
    try{
        const {username, password}= req.body

        if(username=='test' && password== 'test@123!'){
            const token= jwt.sign({}, process.env.JWT_SECRET)
            return res.json({ token })
        }
        else{
            return res.status(401).json({message: "Username or Password is incorrect"})
        }
    }
    catch(e){
        console.log(e)
        return res.status(422).json(e)
    }
}
