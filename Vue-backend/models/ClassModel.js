const mongoose = require('mongoose')
//文档描述规则
const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher_id:{type:String,required:true},
    manager_id:{type:String,required:true}
})
const ClassModel = mongoose.model('classs', classSchema)
module.exports = ClassModel