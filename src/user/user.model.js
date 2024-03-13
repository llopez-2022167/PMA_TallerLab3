'use strict'

import { Schema,model } from 'mongoose'

const userSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT'],
        required: true
    },
    borrowedBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }] // Array de libros prestados por el usuario

},{
    versionKey: false
})

export default model('user', userSchema)
