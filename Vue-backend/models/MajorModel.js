const mongoose = require('mongoose')
//文档描述规则
const majorSchema = new mongoose.Schema({
    name: { type: String, required: true },
})
const MajorModel = mongoose.model('majors', majorSchema)
module.exports = MajorModel