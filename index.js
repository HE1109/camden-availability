const express = require("express");
const {scrapeCamdenOneBed} = require("./scrapeCamdenOneBed");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/getCamden", (req, res) => {
    scrapeCamdenOneBed(res);
})

app.get("/", (req, res) =>{
    res.send(`Render puppeteer server is up and running on port: ${PORT}`);
});


app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
});