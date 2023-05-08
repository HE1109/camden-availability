
const sendNotification =  (listOfApt, floorPlan, promotionValue) => {
    const express = require("express");
    const router = express();
    const fetch = require("node-fetch");
    
    var webhook = 'https://maker.ifttt.com/trigger/camden_availability5.2/with/key/kgMJdVdIQL2p4L0BfdaFXyS7t1wJkvhpTK9Yip6F9Xs';

    var body = {
        value1: floorPlan,
        value2: listOfApt,
        value3: promotionValue
      };
      
      fetch(webhook, {
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});

}

module.exports = { sendNotification };