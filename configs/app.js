'use strict'

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import bookRoutes from '../src/book/book.routes.js'


const app = express()
config()
const port = process.env.PORT || 3056

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use(userRoutes)
app.use('/category', categoryRoutes)
app.use('/book', bookRoutes)

export const initServer = () => {
  app.listen(port)
  console.log(`Server HTTP running in port ${port}`)
}