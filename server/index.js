const express = require('express')
const Koa = require('koa')
const koaStatic = require('koa-static')
const fs = require('fs')
const path = require('path')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/serverEntry').default
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

/**
 * express 使用
 */
const app = express()
app.use('/public', express.static(path.join(__dirname, '../dist')))
app.get('*', (req, res) => {
	const htmlString = ReactSSR.renderToString(serverEntry)
	res.send(template.replace('<app></app>', htmlString))
})
	
/**
 * koa 使用
 */
// const app = new Koa()
// app.use(koaStatic(path.join(__dirname, '../dist/'), {dir: '/public'}))
// app.use(async (ctx, next) => {
// 	const htmlString = ReactSSR.renderToString(serverEntry)
// 	ctx.body = template.replace('<app></app>', htmlString)
// })

app.listen(4000, () => {
	console.log('服务端口：http://localhost:4000')
})