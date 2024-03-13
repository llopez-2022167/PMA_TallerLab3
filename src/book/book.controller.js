'use strict'

import Category from '../category/category.model.js'
import User from '../user/user.model.js'
import Book from './book.model.js'
import {
    checkUpdate
} from '../utils/validator.js'


export const addBook = async (req, res)=>{
    try{
        let data = req.body

        let user = await User.findOne({ _id: data.user })
        if (!user) return res.status(404).send({ message: 'User not found' })
        if (user.borrowedBooks.length >= 2) {
            return res.status(400).send({ message: 'User has already borrowed the maximum number of books' });
        }

        let category = await Category.findOne({_id: data.category})
        if(!category) return res.status(404).send({message: 'Category not found'})

        let book = new Book(data)
        await book.save()
        return res.send({message: 'Product created successfully', book})
    }catch(err){
        console.error(err)
        return res.status(500).send({
            meesage:'Error creating product', err
        })
    }
}


export const searchBook = async (req, res) => {
    try {
        // Obtener el término de búsqueda del cuerpo de la solicitud
        const { searchTerm } = req.body;

        // Buscar libros que coincidan con el término de búsqueda en el título o el nombre del autor
        const books = await Book.find({
            $or: [
                { bookname: { $regex: searchTerm, $options: 'i' } }, // Búsqueda por título del libro (insensible a mayúsculas y minúsculas)
                { author: { $regex: searchTerm, $options: 'i' } } // Búsqueda por nombre del autor (insensible a mayúsculas y minúsculas)
            ]
        });

        // Verificar si se encontraron libros
        if (books.length === 0) {
            return res.status(404).send({ message: 'No books found matching the search term' });
        }

        // Enviar los libros encontrados como respuesta
        return res.send({ message: 'Books found', books });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error searching for books', error });
    }
};


export const updateB = async (req, res)=>{
    try{
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data ,false)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedBook = await Book.findOneAndUpdate({ _id: id }, data, { new: true }).populate('category', ['name', 'description'])
        if (!updatedBook) return res.status(404).send({ message: 'Book not found and not updated' })
        return res.send({ message: 'Product updated successfully', updatedProduct })
    }catch(err){
        console.error(err)
        return req.status(500).send({message: 'Error updating product', err })
    }
}
