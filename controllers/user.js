const allModels = require('../utils/allModels')

//Fetch All Users
exports.getAllUsers = (req, res, next) => {
    allModels.user.find()
        .then(users => {
            return res.status(200).json(users)
        })
        .catch(e => {
            return res.status(422).send(e)
        })
}

//Fetch single User
exports.getUser = (req, res, next) => {
    const id= req.params.id

    allModels.user.findOne({id})
        .then(user => {
            if (!user) return res.status(404).json({ message: `User with id ${id} not exist` })
            return res.status(200).json(user)
        })
        .catch(e => {
            return res.status(422).send(e)
        })
}

//Create New User
exports.createUser = async (req, res) => {

    const { name, address, dob, state } = req.body

    let user = new allModels.user({
        name,
        address,
        dob,
        state
    })

    user.save()
        .then(user => {
            return res.json({
                success: "User Created Successfully",
                data: user
            })
        })
        .catch(e => {
            return res.status(422).send(e)
        })
}


//Update User Info
exports.updateUser = (req, res) => {
    const id = req.params.id
    req.body.id?delete req.body.id:'';

    allModels.user.findOne({id}, (err, user) => {
        if(!user) return res.status(422).json({message: `user with id ${id} not exist`})
        if(err) return res.send(err);

        Object.assign(user, req.body).save((err, user) => {
            if(err) return res.send(err);
            return res.json({ success: "User Updated Successfully", result: user })
        });    
    });
}


//Delete User
exports.deleteUser = (req, res) => {
    const id = req.params.id

    allModels.user.findOne({id}, (err, user) => {
        if(!user) return res.status(422).json({message: `user with id ${id} not exist`})
        if(err) return res.send(err);

        allModels.user.deleteOne({id}, (err, response)=>{
            return res.json({
                success: "User Deleted Successfully",
                result: response
             })
        })

    })
}