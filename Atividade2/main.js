import arrReverse from "./invert.js"
import http from "http"
import fs from "fs"
let host = process.env.host || "127.0.0.1"
let port = process.env.port || 8080


let arr = [5,4,3,2,1]
//let res = arrReverse(arr)
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
        req.on("data",(chunk)=>{data+=chunk})
        req.on("end",()=>{
            let obj = JSON.parse(data)
            let arr = obj.arrayItems
            let result = arrReverse(arr)
            obj.arrayItems = result
            res.writeHead(200,{"Content-Type":"application/json"})
            res.write(JSON.stringify(obj))
            res.end()
        })
    }
});

server.listen(port,host,()=>{
    console.log(`http://${host}:${port}`);
})