'use strcit'

import { Router } from 'express'
import {
    addBook,
    searchBook,
    updateB
} from './book.controller.js'
import {
    isAdmin,
    validateJwt
} from '../middleware/validate-jwt.js'


const api = Router()

api.post('/addBook',[validateJwt], [isAdmin], addBook)
api.post('/searchBook',searchBook)
api.put('/updateB',[validateJwt],[isAdmin] ,updateB)

export default api

