const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');

const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || 2023;

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
  });
  

async function generateImage(buffer, slider) {
    // Generates 6 images
    //  curl -H "Content-Type: application/json" -d '{ "image":"89898998989AAA", "slider": "0.1"}' http://004d-34-125-191-15.ngrok-free.app/6969
    const request = { "image": buffer, "slider": slider };
    const resp = await axios.post(
        "http://70f7-34-125-191-15.ngrok-free.app/6969",
        request
    );
    return resp;
}

app.post("/upload", async (req, res) => {
    const imgName = req.body.imageName;
    const document = req.body;
    const slider = req.body.slider;
    // [base64], [base64]

    let buffer = Buffer.from(
        document.base64.split(",").pop(),
        "utf-8"
    ).toString();
    //Write image to file
    fs.writeFile(
        `${process.cwd()}/server/images/user/${imgName}`,
        buffer,
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
    const path = `/images/user/${imgName}`;
    try {
        const resp = await generateImage(buffer, slider);
        res.send(resp.data);
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
