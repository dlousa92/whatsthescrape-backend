const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const app = express()
const port = 8000

const cors = require('cors')

app.get('/', (req, res) =>
  res.send('Hello World!')
)

app.get('/scrape', (req, res) => {
  let url = req.query.url
  let data
  let text

  // If no url provided, don't do anything
  if (!url) {
    return
  }

  request(url, function (error, response, html) {
    if (!error) {
      data = cheerio.load(html)
      // Get text on webpage
      text = data('body').text()

      // Remove whitespace and non alphanumeric characters, change text to be lowercase
      text = text.replace(/\s+/g, ' ')
        .replace(/[^a-zA-Z ]/g, '')
        .toLowerCase()
    }
    res.send(text)
  })
})

app.get('/scrape-img', (req, res) => {
  res.send('hello world this is another request')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
