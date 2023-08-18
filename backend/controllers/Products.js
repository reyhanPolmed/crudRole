import Products from "../models/ProductModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";

export const getProducts = async (req,res) => {
    try {
        let response;
        if(req.role == "admin") {
            response = await Products.findAll({
                attributes: ['uuid','name','price'],
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        } else {
            response = await Products.findAll({
                attributes: ['uuid','name','price'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getProductById = async (req,res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if(!product) return res.status(404).json({msg: 'data tidak ditemukan'});
        let response;
        if(req.role == "admin") {
            response = await Products.findOne({
                attributes: ['uuid','name','price'],
                where: {
                    id: product.id
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        } else {
            response = await Products.findOne({
                attributes: ['uuid','name','price'],
                where: {
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

}

export const createProduct = async (req,res) => {
    const {name,price} = req.body;
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId
        })
        res.status(201).json({msg: "product berhasil ditambahkan"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const updateProduct = async (req,res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if(!product) return res.status(404).json({msg: 'data tidak ditemukan'});
        const {name,price} = req.body;
        if(req.role == "admin") {
           await Products.update({name,price},{
            where: {
                id: product.id
            }
           })
        } else {
            if(req.userId !== product.userId) return res.status(403).json({msg: "akses terlarang"})
           await Products.update({name,price},{
            where: {
                [Op.and]:[{id: product.id},{userId: req.userId}]
            },

           })
        }
        res.status(200).json({msg: 'product berhasil di update'})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

}

export const deleteProduct = async (req,res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        })
        if(!product) return res.status(404).json({msg: 'data tidak ditemukan'});
        if(req.role == "admin") {
           await Products.destroy({
            where: {
                id: product.id
            }
           })
        } else {
            if(req.userId !== product.userId) return res.status(403).json({msg: "akses terlarang"})
           await Products.destroy({
            where: {
                [Op.and]:[{id: product.id},{userId: req.userId}]
            },

           })
        }
        res.status(200).json({msg: 'product berhasil dihapus'})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}