import  express from 'express';
import { ProductManager } from './managers/ProductManager.js';
import { CartManager } from './managers/CartManager.js';
import productsRouter from './rutas/pruduct.router.js';
import cartsRouter from './rutas/carts.router.js';


const PORT = 8080;
const PATH_PRODUCTS = './Preentrega1/src/info/products.json';
const PATH_CARTS = './Preentrega1/src/info/carts.json';


const app = express();
export const productManager = new ProductManager(PATH_PRODUCTS);
export const cartManager = new CartManager(PATH_CARTS);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto: ${PORT}`);
});