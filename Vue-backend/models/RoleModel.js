const mongoose = require('mongoose')
const roleSchema=new mongoose.Schema({
    name:{type:String,required:true},
    auth_name:String,
    auth_time:Number,
    create_time:{type:Number,default:Date.now},
    menus:Array
})

//定义model
const  RoleModel=mongoose.model('role',roleSchema)
module.exports= RoleModel
