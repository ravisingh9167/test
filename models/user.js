let mongoose = require("mongoose")
const autoIncrement = require("mongoose-auto-increment");

let userSchema= new mongoose.Schema({
        id: {
            type: Number,
            unique: true
        },
        name: {
            type: String,
            required: [true, 'name is required']
        },
        address: {
            type: String,
            required: [true, 'address is required']
        },
        dob: {
            type: String,
            required: [true, 'dob is required']
        },
        state: {
            type: String,
            required: [true, 'state is required']
        },
        createdAt: {
            type: Date, default: Date.now 
        }
    },
    { 
        versionKey: false
    }
)

autoIncrement.initialize(mongoose.connection)
//For Auto Increment
userSchema.plugin(autoIncrement.plugin, {
    model: 'users',
    field: 'id',
    startAt: 1,
    incrementBy: 1
})

const UserModel= mongoose.model('users', userSchema);

module.exports= UserModel