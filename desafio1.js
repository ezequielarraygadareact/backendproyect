class ProductManager {
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    getProductsByID(id){
        if(!id){
            console.log("Ingresar ID para la busqueda");
            return;
        }

        const searcher = this.products.find((p) => p.id === id);

        if(searcher) {
            console.log(searcher);
        } else {
            console.log("Not found")
        }
    }

    addProduct(product){
        const { title, description, price, code, thumbnail, stock } = product
        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            code,
            thumbnail,
            stock
        }

        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios");
        }
        if(this.products.some((p) => p.code === product.code)){
            console.error("El código ya exite");
            return;
        }
                this.products.push(newProduct)
        }
    }   



const productManager = new ProductManager()
console.log(productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: '200',
    code: 'abc123',
    thumbnail: 'sin imagen',
    stock: '25'
}))
console.log(productManager.addProduct({
    title: 'TITULO2',
    description: 'desctiption2',
    price: 'price2',
    code: 'code2',
    thumbnail: 'thumbnail',
    stock: 'stock'
}))
console.log(productManager.addProduct({
    title: 'TITULO3',
    description: 'desctiption3',
    price: 'price3',
    code: 'code3',
    thumbnail: 'thumbnail',
    stock: 'stock'
}))
console.log(productManager.addProduct({
    title: 'TITULO4',
    description: 'desctiption4',
    price: 'price4',
    code: 'code2',
    thumbnail: 'thumbnail',
    stock: 'stock'
}))
console.log(productManager.getProducts())
productManager.getProductsByID(1)
productManager.getProductsByID(9)