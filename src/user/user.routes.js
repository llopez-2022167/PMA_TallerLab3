'use strict'

import express from 'express'

import { 
    register,
    login,
    update,
    deleteU
} from './user.controller.js'
import { 
    isAdmin, validateJwt 
} from '../middleware/validate-jwt.js'

const api = express.Router()

api.post('/register', register)
api.post('/login', login)
api.put('/update/:id', [validateJwt], [isAdmin], update)
api.delete('/deleteU/:id', [validateJwt], [isAdmin], deleteU)

export default api