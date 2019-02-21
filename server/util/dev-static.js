const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const proxy = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:3333/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor
const mfs = new MemoryFs()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats
    .errors
    .forEach(err => console.error(err))
  stats
    .warnings
    .forEach(warn => console.warn(warn))
  const bundlePath = path.join(serverConfig.output.filename, serverConfig.output.path)
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = (app) => {
  app.use('/public', proxy({target: 'http://localhost:3333'}))

  app.get('*', (req, res) => {
    getTemplate().then(tpl => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(tpl.replace('<!-- app -->', content))
    })
  })
}
