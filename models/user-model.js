const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    fullname:{
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    bookedSlotbookingID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"booking"
    }],
    contact: Number
})
module.exports= mongoose.model("user",userSchema);
