import Even from "./getPares.js"
import http from "http"
import fs from "fs"
let host = process.env.host || "127.0.0.1"
let port = process.env.port || 8080

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
        let data =""
        req.on("data",(chunk)=>{
            data+=chunk
        })
        req.on("end",()=>{
            let num = parseInt(data)
            let arr = Even(num)
            res.write(JSON.stringify({"arrayE":arr}))
            res.end()
        })
    }
});
server.listen(port,host,()=>{
    console.log(`http://${host}:${port}`);
})