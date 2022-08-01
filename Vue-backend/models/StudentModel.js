const mongoose = require("mongoose")
const studentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true},
    school:{type:String},
    major:{type:String},
    grade:{type:String},
    education:{type:String},
    direction:{type:String,required:true},
    id_number:{type:String},
    phone:{type:String,required:true},
    parent:{type:String},
    parent_phone:{type:String},
    address:{type:String},
    qq:{type:String,required:true},
    class:{type:String,required:true},
    addmission_date:{type:String},
    teacher_id:{type:String,required:true},
    manager_id:{type:String,required:true},
    pictures:{type:Array},
    note:{type:String},
})
const StudentModel = mongoose.model('student',studentSchema)
module.exports = StudentModel