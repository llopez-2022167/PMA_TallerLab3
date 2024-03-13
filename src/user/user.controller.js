'use strict'

import User from './user.model.js'
import Book from '../book/book.model.js'
import {
    encrypt,
    checkPassword, 
    checkUpdate
} from '../utils/validator.js'
import {
    generateJwt
} from '../utils/jwt.js'
//import { triggerAsyncId } from 'async_hooks'

export const register = async(req, res)=>{
    try{
        let data = req.body
        let book = await Book.findOne({_id: data.book})
        if(!book) return res.status(404).send({message: 'usur not found'})
        let user = new User(data)
        await user.save()
        return res.send({message: 'user created successfully', user})
    }catch(err){
        console.error(err)
        return res.status(500).send({
            message: 'Error registering user', err: err
        })
    }
}


export const login = async(req, res)=>{
    try{
        let {username, password}= req.body
        let user= await User.findOne({username})
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
              uid: user._id,
              name: user.name,
              role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({message: `Wlcome ${user.name}`,loggedUser, token})    
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return req.status(500).send({message: 'Erro to login'})
    }
}

let defaultAdmin = {
    name: 'Aadmin',
    email: 'admin@example.com', 
    password: 'admin123',
    role: 'ADMIN'
}

export const adminDefault = async(req, res)=>{
    try{
        let admin = await User.findOne({ username: defaultAdmin.username })
        if (admin) {
          console.log('This admin is already exists')
        } else {
          defaultAdmin.password = await encrypt(defaultAdmin.password)
          let newAdmin = await User.create(defaultAdmin)
          console.log(`A default admin is create, can be logged with user: ${newAdmin.username}`)
        }
    } catch (err) {
        console.error(err)
        return err
        //return res.status(500).send({ message: 'Error registering user' })
    }
}

export const update = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedUser = await User.findOneAndUpdate(
          {_id: id},
          data,
          {new: true}
        )
        if (!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        return res.send({message: 'Updated user', updatedUser})
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({
            message: `Username: ${err.keyValue.username}, is already taken`
        })
        return res.status(500).send({message: 'Error updating account'})
    }
}


export const deleteU = async(req, res)=>{
    try{
        let {id} = req.params
        let deletedUser = await User.findOneAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        return res.send({
            message: `Account whith username ${deletedUser.username} deleted succesfully`
        })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}