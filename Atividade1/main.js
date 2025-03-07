import dividir from "./dividir.js"
import subtrair from "./subtrair.js"
import multiplicar from "./multiplicar.js"
import somar from "./somar.js"
//let http = require("http");
//let fs = require("fs");
import http from "http"
import fs from "fs"
let host = process.env.host || "127.0.0.1"
let port = process.env.port || 8080

let opt = "/"
let num1 = 2
let num2 = 2
let result = 0;
function fgetRes(n1,n2){
    switch(opt){
        case "+":
            result = somar(n1,n2)
        break;
        case "-":
            result = subtrair(n1,n2)
        break;
        case "/":
            result = dividir(n1,n2)
        break;
        case "*":
            result = multiplicar(n1,n2)
        break;
        default:
            result = 0;
    }
}
let server = http.createServer((req,res)=>{
    if(req.method==="GET" && req.url==="/"){
        fs.readFile("index.html",(err,file)=>{
            if(err){
                res.writeHead(500,{"Content-Type":"text/plain"})
                res.write(file)
                res.end()
            }
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(file)
            res.end()
        })
    }
    if(req.method==="POST" && req.url==="/res"){
        let data=""
        req.on("data",(chunk)=>{
            data+=chunk
        })
        req.on("end",()=>{
            let body = JSON.parse(data)
            num1 = parseInt(body.number1)
            num2 = parseInt(body.number2)
            opt = body.opt
            console.log("nums -> "+num1+" - "+num2)
            fgetRes(num1,num2)
            console.log("the res is "+result)
            res.writeHead(200,{"Content-Type":"text/plain"})
            res.write(result.toString())
            res.end()
        })
    }
})
server.listen(port,host,()=>{
    console.log(`http://${host}:${port}`);
})