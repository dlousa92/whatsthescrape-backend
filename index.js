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

  if (!url) {
    return
  }

  request(url, function (error, response, html) {
    if (!error) {
      data = cheerio.load(html)
      text = data.text()

      text = text.replace(/\s+/g, ' ')
        .replace(/[^a-zA-Z ]/g, '')
        .toLowerCase()
    }
    res.send(text)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
