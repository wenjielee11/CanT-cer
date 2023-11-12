const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

const axios = require("axios");
const archiver = require("archiver");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static("./build"));
const port = process.env.PORT || 2023;
let imageCount = 0;

app.get("*", (req, res) => {
    res.sendFile(path.join(`${process.cwd()}` + "/build/index.html"));
});

async function generateImage(buffer, slider, endpoint) {
    // Generates 6 images
    //  curl -H "Content-Type: application/json" -d '{ "image":"89898998989AAA", "slider": "0.1"}' http://004d-34-125-191-15.ngrok-free.app/6969
    const request = { image: buffer, slider: slider };
    const resp = await axios.post(
        "http://aaf3-34-125-191-15.ngrok-free.app/6969",
        request
    );
    return resp;
}

async function saveFile(data) {
    let buffer = Buffer.from(data.predicted_image, "utf-8");

    fs.writeFileSync(
        `${process.cwd()}/server/images/result/predicted/${imageCount}.jpg`,
        JSON.stringify(buffer)
    );
    buffer = Buffer.from(data.masked_image, "utf-8");
    fs.writeFileSync(
        `${process.cwd()}/server/images/result/masked/${imageCount}.jpg`,
        JSON.stringify(buffer)
    );
    let highestValue = -Infinity;
    let highestValueDiagnosis = null;
    for (let diagnosis in data.diagnosis_score) {
        let value = data.diagnosis_score[diagnosis];
        if (value > highestValue) {
            highestValue = value;
            highestValueDiagnosis = diagnosis;
        }
    }

    let dataResp = {
        Category: highestValueDiagnosis,
        Confidence: highestValue,
    };
    fs.writeFileSync(
        `${process.cwd()}/server/images/result/category/${imageCount}.txt`,
        JSON.stringify(dataResp)
    );
    imageCount++;
}

app.get("/export", async (req, res) => {
    res.attachment("archive.zip");
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);
    archive.directory(
        `${process.cwd()}/server/images/result/predicted/`,
        "predicted"
    );
    archive.directory(
        `${process.cwd()}/server/images/result/masked/`,
        "masked"
    );
    archive.directory(
        `${process.cwd()}/server/images/result/category/`,
        "category"
    );
    archive.finalize();

    //Clean up
    res.on("finish", () => {
        fs.readdir(
            `${process.cwd()}/server/images/result/predicted/`,
            (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    fs.unlink(
                        path.join(
                            `${process.cwd()}/server/images/result/predicted/`,
                            file
                        )
                    );
                }
            }
        );
        fs.readdir(
            `${process.cwd()}/server/images/result/masked/`,
            (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    fs.unlink(
                        path.join(
                            `${process.cwd()}/server/images/result/masked/`,
                            file
                        )
                    );
                }
            }
        );
        fs.readdir(
            `${process.cwd()}/server/images/result/category/`,
            (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    fs.unlink(
                        path.join(
                            `${process.cwd()}/server/images/result/category/`,
                            file
                        )
                    );
                }
            }
        );
    });
});

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
        saveFile(resp.data);
        res.send(resp.data);
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
