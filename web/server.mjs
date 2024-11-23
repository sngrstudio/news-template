// @ts-check
import express from 'express'
import morgan from 'morgan'

// @ts-ignore
import { handler as ssrHandler } from './dist/server/entry.mjs'

const app = express()
app.use('/', express.static('dist/client'))
app.use('/app', async (req, res) => {
  const response = await fetch(`${process.env.CONTENT_ENDPOINT}/app${req.url}`)
  const data = await response.arrayBuffer()
  res.set('Content-Type', response.headers.get('Content-Type') || 'text/html')
  res.send(Buffer.from(data))
})
app.use(ssrHandler)
app.use(morgan('combined'))

const PORT = process.env.PORT || 4321
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => {
  ;`Server started at ${HOST}:${PORT}`
})
