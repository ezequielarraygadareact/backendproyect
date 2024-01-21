import express from 'express';
import { ProductManager } from './productManager.js';


const url = './products.json'; //Variable URL

const productManager = new ProductManager(url);

const app = express(); //Iniciar APP


// Get productos
app.get('/products', async(req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getProducts(limit);
        let productsParsed = JSON.parse(products);

        if(!isNaN(limit) && limit > 0) {
            let productsLimited = productsParsed.slice(0, limit);
            
            if (productsLimited.length > 0) {
                res.json(productsLimited);
            } else {
                res.json(productsParsed);
            }
        }

    } catch (error) {
        res.json(error);
    }
})


//Get por ID
app.get('/products/:pid', async(req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id);

        res.json(product);
    }
    catch (error) {
        res.json(error);
    }
})

app.listen(8080, () => console.log('Servidor Express'))