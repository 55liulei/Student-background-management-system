const express =require("express")
const  mongoose = require("mongoose")
var badyParser=require("body-parser")
const  path = require("path")
const bodyParser = require("body-parser")
const app= express()
//使用中间件
app.use(express.static('public'))
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())
//开放node_modules路径
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules')))
//路由器中间件文件
const indexRouter=require('./routers')
app.use("/",indexRouter)

//通过mongoose连接数据库
mongoose.connect('mongodb://localhost/Vue_backend',{useNewUrlParser:true})
.then(()=>{
    console.log('数据库连接成功');
    app.listen('3000',()=>{
        console.log("服务器启动成功,请访问http://localhost:3000");
    })
}).catch(error=>{
    console.log("数据库连接失败",error);
})