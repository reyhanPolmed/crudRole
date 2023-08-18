import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/Products.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/products',verifyUser ,getProducts);
router.get('/product/:id', verifyUser,getProductById);
router.post('/product/add',verifyUser,createProduct);
router.patch('/product/edit/:id',verifyUser,updateProduct);
router.delete('/product/:id',verifyUser,deleteProduct);

export default router;