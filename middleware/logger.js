const fs = require("fs")

const logger = (req,res,next)=>{
    // console.log(req.url, req.method);
    fs.appendFileSync("./logs.txt",`${req.url} ${req.method} ${Date.now()} \n`)
    
    next()
}
module.exports = logger