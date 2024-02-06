import fs from 'fs';

export class ProductManager {

    constructor(path) {
        this.products = []; 
        this.path = path; 
    }

    addProduct(product){
                this.getProducts();
                const { title, description, price, thumbnail, code, stock } = product;
        
                if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                    return console.log('Todos los campos son obligatorios');
                }
        
                const newProduct = {
                    id: this.products.length + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }

                const repeatedCode = this.products.findIndex(product => product.code === code);
                if(repeatedCode === -1) {
                    this.products.push(newProduct);

                    let newProductStr = JSON.stringify(this.products, null, 2)
                    fs.writeFileSync(this.path, newProductStr)
                    return 'Producto agregado correctamente'
                } else {
                    return('Ese codigo ya existe, pruebe con otro.')
                }
            }

//Get productos
    async getProducts(limit) {
        try {
            const responseProduct = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(responseProduct);
    
            if (limit) {
                return products.slice(0, limit);
            }
            return products;
        } catch (error) {
            console.log('Ocurrio un error durante la lectura del archivo', error);
            throw error;
        }
    }

//Get por ID
    async getProductById(id) {
        try {
            const responseProductId = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(responseProductId);

            const product = products.find(product => product.id == id);
            if (!product) {
                return `No se encontró el producto con id: ${id}`;
            }
            return product;
        } catch (error) {
            console.log('Ha ocurrido un error', error);
            throw error;
        }
    }
}

//PRUEBA
const productManager = new ProductManager();

const product6 = {
    id: 5,
    title: "Producto6",
    description: "Descripción6",
    price: 199.99,
    thumbnail: "Sin foto",
    code: "code6",
    stock: 29,
};

productManager.addProduct(product6)