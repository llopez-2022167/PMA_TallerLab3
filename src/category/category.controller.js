'use strict'

import Category from './category.model.js'
import {encrypt,checkUpdate, checkPassword}  from '../utils/validator.js'
//import {generateJwt} from '../utils/jwt.js'


export const registerCategory = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new Category(data)
        await user.save()
        return res.send({message: `Registered succesfully, can be logged with email use ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({
            message: 'Error registering user', err: err
        })
    }
}

// Obtener todas las categorías
export const getAllCategory = async (req, res) => {
    try {
      let categories = await Category.find();
      return res.send({ categories });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error fetching categories', err: err });
    }
};
  
// Actualizar una categoría existente
export const updateCategory = async (req, res) => {
    try {
      let { id } = req.params;
      let data = req.body;
      let updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
      if (!updatedCategory) {
        return res.status(404).send({ message: 'Category not found and not updated' });
      }
      return res.send({ message: 'Category updated successfully', updatedCategory });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error updating category', err: err });
    }
};
  
  // Eliminar una categoría existente
export const deleteCategory = async (req, res) => {
    try {
      let { id } = req.params;
      let deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).send({ message: 'Category not found and not deleted' });
      }
      return res.send({ message: 'Category deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error deleting category', err: err });
    }
};