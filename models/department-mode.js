const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    contact: {
        type: String,
        required: true,
        trim: true,
    },
    numberOfRooms: {
        type: Number,
        required: true,
        min: 0 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
