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

  if (!url) {
    return
  }

  request(url, function (error, response, html) {
    if (!error) {
      data = cheerio.load(html)
      console.log(data)
    }
    res.send(data.text())
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
