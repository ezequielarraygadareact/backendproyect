
import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: {type: String, required: true}, 
    description: {type: String, required: true}, 
    price: {type: Number, required: true}, 
    thumbnail: {type: String, required: true}, 
    code: {type: Number, required: [true, "código único de producto"], unique: true}, 
    stock: {type: Number, required: true}, 
    category: {type: String, required: true}, 
    status: {type: String, required: true}
});

const productModel = mongoose.model (productCollection, productSchema);

export default productModel;
