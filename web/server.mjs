// @ts-check

import express from 'express'
import morgan from 'morgan'
// @ts-ignore
import { handler as ssrHandler } from './dist/server/entry.mjs'

const app = express()

app.use(morgan('common'))
app.use('/', express.static('./dist/client'))
app.use(ssrHandler)

app.listen(4321, '0.0.0.0')
