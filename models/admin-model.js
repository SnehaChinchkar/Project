const mongoose= require('mongoose');

const adminSchema= mongoose.Schema({
    fullname:{
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    department:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"department"
        }
    ]
})
module.exports= mongoose.model("admin",adminSchema);