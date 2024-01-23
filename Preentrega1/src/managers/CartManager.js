import fs from "fs"
import { productManager } from '../app.js';

export class CartManager {
    constructor () {
    this.path = "./Preentrega1/src/info/carts.json";
    };

    getCarts(){
        try {
            const data = fs.readFileSync(this.path, "utf8");
            this.carts = JSON.parse(data);
            return this.carts;      
        } catch (error) {
            console.error("Error, el archivo no se pudo leer", error);
            return []; 
        }
    };


    addCart() { 
        this.getCarts()
        const newCart = {
            id: this.carts.length + 1,
            products: []
        };

        this.carts.push(newCart);

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
            console.log("Se ah guardado el carro de compras");
            return newCart;
                
        } catch (error) {
            console.error("No se pudo guardar el carro de compras", error)     
        }
    };

    getCartById(cartId){
        this.getCarts()
        const cart = this.carts.find (cart => cart.id === cartId);
        console.log(cart);
        if (cart) {
            return cart;
        } else {
            console.log("No se encontro el carrod de compras");
            return null;
        }    
    };

    addProduct(cartId, productId) {
        try {
            this.getCarts();
            const cart = this.carts.find(cart => cart.id === cartId);

            if (!cart) {
                throw new Error(`No se encontró el carro de compras de ID: ${cartId}`);
            }

            const existingProduct = cart.products.find(product => product.id === parseInt(productId));

            if (!existingProduct) {
                const product = productManager.getProductById(productId);

                if (!product) {
                    throw new Error(`No se encontró el producto de ID: ${productId}`);
                }

                cart.products.push({
                    id: parseInt(productId),
                    quantity: 1
                });
            } else {
                existingProduct.quantity++;
            }

            fs.writeFileSync(this.path, JSON.stringify(this.carts));
            return cart;
        } catch (error) {
            console.error("No se pudo agregar el producto al carro de compras", error);
            throw error;
        }
    }


    deleteProduct(cartId, productId) {

        try {
            this.getCarts();
            const cart = this.carts.find(cart => cart.id === cartId);

            if (!cart) {
                throw new Error(`No se encontró el carrito de ID: ${cartId}`);
            }

            const productIndex = cart.products.findIndex(product => product.id === parseInt(productId));

            if (productIndex === -1) {
                throw new Error(`No se encontró el producto de ID: ${productId} en el carrito con id ${cartId}`);
            }

            const product = cart.products[productIndex];

            if (product.quantity > 1) {
                product.quantity--;
            } else {
                cart.products.splice(productIndex, 1);
            }

            fs.writeFileSync(this.path, JSON.stringify(this.carts));
            return cart;
        } catch (error) {
            console.error("Error al eliminar producto del carro de compras", error);
            throw error;
        }
    }
}