'use strict'

import { Schema, model } from "mongoose"

const bookSchema = Schema({
    bookname: {
        type: String,
        required: true
    },
    author: {//Nombre del autor
        type: String,
        required: true
    },
    category: {//Categoria
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isBorrowed: {//es prestado
        type: Boolean,
        default: false // Por defecto, un libro no está prestado
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // Nueva propiedad para controlar el número máximo de libros prestados por usuario
    borrowerCount: {
        type: Number,
        default: 0,
        max: 2 // Máximo dos libros pueden ser prestados
    }
},{
    versionKey: false
})


export default model('book', bookSchema)