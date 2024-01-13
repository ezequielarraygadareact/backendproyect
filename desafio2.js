const fs = require("fs");

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "products.json";
    }

    addProduct(product) {
        this.getProducts();
        const { title, description, price, thumbnail, code, stock } = product;

        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios")
            return;
        }

        if(this.products.some((p) => p.code === code)) {
            console.log("El codigo del producto ya existe")
            return;
        }

        const id = this.setId();
        this.products.push({ id, ...product });

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("Datos guardados exitosamente");
        } catch (error) {
            console.error("Error al escribir el archivo");
        }
    }

    getProducts() {
        try {
                const data = fs.readFileSync(this.path, "utf8");
                this.products = JSON.parse(data);
                console.log("Archivo leido exitosamente")
            // }
        } catch (error) {
            console.error("Error al leer el archivo", error);
        }
        return this.products;
    }

    getProductsById(id) {
        this.getProducts();
        const product = this.products.find((p) => p.id === id)
        if(product === undefined) {
            console.log(` El producto con el id ${id} no existe`)
        } else return product
    }

    setId() {
        this.lastId = this.getLastProductId()
        if(this.lastId === 0) this.lastId = 1;
        else this.lastId++;
        return this.lastId;
    }

    getLastProductId(){
        if(this.products.length === 0) return 0;
        const lastProductId = this.products[this.products.length - 1].id;
        console.log(`El ultimo id es: ${lastProductId}`);
        return lastProductId;
    }

    updateProduct(id, updatedProduct){
        this.getProducts();
        if(this.products.find((product) => product.id === id) === undefined) {
            console.error(`El id ${id} no existe`);
            return;
        }

        const indice = this.products.findIndex(product => product.id === id);
        this.products[indice] = { id, ...updatedProduct };

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("Archivo actualizado");
        } catch (error) {
            console.error("No se pudo actualizar el archivo", error);
        }
    }


    deleteProduct(id){
        this.getProducts();

        if(this.products.find((product) => product.id === id) === undefined) {
            console.error(`El id ${id} no existe`);
            return;
        }

        const indice = this.products.findIndex(product => product.id === id);

        this.products.splice(indice, 1);

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log("Producto borrado exitosamente");
        } catch (error) {
            console.error("No se pudo borrar el producto", error);           
        }
    }

}

const productManager = new ProductManager();
 const product1 = {
     title: 'Título',
     description: 'Descripción',
     price: 11500,
     thumbnail: 'Sin foto',
     code: 'code',
     stock: 6
} 

// const product2 = {
//     title: 'Título 2',
//     description: 'Descripción 2',
//     price: 5510,
//     thumbnail: 'Sin foto',
//     code: 'code2',
//     stock: 54
// } 


productManager.addProduct(product1);
// productManager.addProduct(product2);
let misProductos = productManager.getProducts();
console.log(misProductos);

// const producto = productManager.getProductsById(2);
// console.log(producto);

// const product3 = {
//     title: 'Título N3',
//     description: 'Descripción N3',
//     price: 3503,
//     thumbnail: 'Sin foto',
//     code: 'code3',
//     stock: 65
// } 

// productManager.updateProduct(3, product3);

// const product4 = {
//     title: 'Título N4',
//     description: 'Descripción N4',
//     price: 5534,
//     thumbnail: 'Sin foto',
//     code: 'code4',
//     stock: 16
// } 

// productManager.addProduct(product4);

// productManager.deleteProduct(2);

misProductos = productManager.getProducts();
console.log(misProductos)