const puppeteer = require("puppeteer");
const {sendNotification} = require("./sendNotification");
require("dotenv").config();

const scrapeCamdenOneBed = async (res) => {
  const browser = await puppeteer.launch(
    {
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
        ],
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
      }
  );

  try {
    const page = await browser.newPage();

    await page.goto(
      "https://www.camdenliving.com/apartments/tempe-az/camden-tempe-west/available-apartments"
    );

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    const desiredFloorPlan = "The A5.2 - West";
    const xPath =
      "//div[contains(@class, flex) and contains(@class, flex-wrap) and contains(@class, justify-start) and contains(@class, 'sm:justify-center') and contains(@class, 'sm:px-4')]//a[contains(@class, 'floor-plan-card-see-more-button')]";
    let anchors = await page.$x(xPath);

    for (let i = 0; i < anchors.length; i++) {
      const currentFloorPlanName = await page.evaluate(
        (anchor) => anchor.getAttribute("data-floor-plan-name"),
        anchors[i]
      );
      if (currentFloorPlanName == desiredFloorPlan) {
        console.log(currentFloorPlanName);
        const href = await page.evaluate(
          (anchor) => anchor.getAttribute("href"),
          anchors[i]
        );
        const newUrl = "https://www.camdenliving.com" + href;
        console.log(newUrl);
        await page.goto(newUrl);
        break;
      }
    }

    let spans = await page.$x("//span[contains(@class, 'flex items-center')]");
    let listOfApt = [];

    for (let i = 0; i < spans.length; i++) {
      const apartment = await page.evaluate((el) => el.innerHTML, spans[i]);
      console.log(apartment.replace(/\s/g, ""));
      listOfApt.push(apartment.replace(/\s/g, ""));
    }
    sendNotification(listOfApt.join(", "), desiredFloorPlan);
    res.send(listOfApt.join(", "));
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeCamdenOneBed };
