const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const ReactSSR = require('react-dom/server')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'loginFlag',
  resave: false,
  saveUninitialized: false,
  secret: '345%^#@ysldkfl090833'
}))

const isDev = process.env.NODE_ENV === 'development'

// if (!isDev) {
  const serverEntry = require('../dist/serverEntry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    const htmlString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', htmlString))
  })
// } 
// else {
//   const devStatic = require('./util/dev-static')
//   devStatic(app)
// }

app.listen(4000, () => {
  console.log('服务端口：http://localhost:4000')
})
