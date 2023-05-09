const express = require("express");
const {scrapeCamdenOneBed} = require("./scrapeCamdenOneBed");
const cron = require("node-cron");
const app = express();

const PORT = process.env.PORT || 4000;
let visits = 0;

app.get("/getCamden", (req, res) => {
    scrapeCamdenOneBed(res);
})

app.get("/", (req, res) =>{
    res.send(`Render puppeteer server is up and running on port: ${PORT}`);
    visits += 1;
    let date = new Date();
    console.log(`${date} ::: visits: ${visits};`);
});


app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
});

cron.schedule("30 0 * * *", function() {
    console.log("running cron job for scrapeCamden.....");
    let no_res = "n";
    scrapeCamdenOneBed(no_res);
});