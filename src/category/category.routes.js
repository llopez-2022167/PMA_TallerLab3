'use strict'

import express from 'express'

import {
    registerCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
} from './category.controller.js'

import {
    isAdmin, 
    validateJwt
} from '../middleware/validate-jwt.js'

const api = express.Router()

api.post('/registerCategory', [validateJwt], registerCategory)
api.post('/getAllCategory', getAllCategory)
api.put('/updateCategory:id', [validateJwt],[isAdmin], updateCategory)
api.delete('deleteCategory:id' , [validateJwt],[isAdmin],deleteCategory)

export default api