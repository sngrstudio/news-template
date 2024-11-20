// @ts-check
import express from 'express'
import morgan from 'morgan'

// @ts-ignore
import { handler as ssrHandler } from './dist/server/entry.mjs'

const app = express()
app.use('/', express.static('dist/client'))
app.use(ssrHandler)
app.use(morgan('combined'))

const PORT = process.env.PORT || 4321
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => {
  ;`Server started at ${HOST}:${PORT}`
})
