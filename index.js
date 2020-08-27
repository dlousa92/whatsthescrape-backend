const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
const localPort = 8000;

const cors = require("cors");

app.use(cors());

app.get("/scrape", (req, res) => {
  let url = req.query.url;
  let data;
  let text;

  // If no url provided, don't do anything
  if (!url) {
    return;
  }

  request(url, function (error, response, html) {
    if (!error) {
      data = cheerio.load(html);
      // Get text on webpage
      text = data("body").text();

      // Remove whitespace and non alphanumeric characters, change text to be lowercase
      text = text
        .replace(/\s+/g, " ")
        .replace(/[^a-zA-Z ]/g, "")
        .toLowerCase();
    } else {
      console.log(`There has been an error ${error}`);
    }
    res.send(text);
  });
});

app.get("/scrape-img", (req, res) => {
  let url = req.query.url;
  let data;
  let imageArray = [];

  // If no url provided, don't do anything
  if (!url) {
    return;
  }

  request(url, function (error, response, html) {
    if (!error) {
      data = cheerio.load(html);

      // Send each images src and alt attributes to the front end
      data("img").each(function () {
        imageArray.push({
          src: `${this.attribs.src}`,
          alt: `${this.attribs.alt}`,
        });
      });
    } else {
      console.log(`There has been an error ${error}`);
    }
    res.send(imageArray);
  });
});

app.listen(process.env.PORT || localPort);
