const express = require('express')
const fs = require("fs")
const app = express()
const port = 2023
const cors = require("cors");
const multer = require("multer")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit:'50mb'}))

async function generateImage(path, count){
    // Generates 6 images
    const images = ["/images/result/1.jpg", "/images/result/2.jpg"];
    const resp = []
    for(const imageName of images){
        const imageBuffer = fs.readFileSync(`${process.cwd()}/server`+imageName)
        const base64Image = Buffer.from(imageBuffer).toString("base64");
        resp.push(base64Image);
    }
    return resp;
}


app.post("/upload", async (req,res)=>{
    const imgName = req.body.imageName;
    const document = req.body;
    let buffer = Buffer.from(document.base64.split(",").pop(), "base64")
    //Write image to file
    fs.writeFile(`${process.cwd()}/server/images/user/${imgName}`, buffer, (err) => { if (err) { console.log(err) } })
    const path = `/images/user/${imgName}`
    try{
        const resp = await generateImage(path, req.body.count);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(resp));
    }catch(err){
        throw err;
    }
})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})