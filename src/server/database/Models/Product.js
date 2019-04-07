import { Schema } from 'mongoose';
import mongoose from '../mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

});

const Product = mongoose.model('Product', productSchema);

export default Product;