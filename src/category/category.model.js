'use strict'

import { Schema, model } from 'mongoose'

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        uniqued: true
    }
},{
    versionKey : false
})

export default model('category', categorySchema)
