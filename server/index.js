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
    const images = ["/images/result/1", "/images/result/2"];
    /**    for(let i = 0; i<count;i++){
        images.push("/images/result");
    }*/
    return images;
}


app.post("/upload", async (req,res)=>{
    const imgName = req.body.imageName;
    const document = req.body;
    let buffer = Buffer.from(document.base64.split(",").pop(), "base64")
    //Write image to file
    fs.writeFile(`${process.cwd()}/server/images/user/${imgName}.jpg`, buffer, (err) => { if (err) { console.log(err) } })
    const path = `/images/user/${imgName}`
    try{
        const resp = await generateImage(path, count);
        res.sendFile(resp);
    }catch(err){
        res.send({result:false, output: "error processing files"})
    }
})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})