import { Schema } from 'mongoose';
import mongoose from '../mongoose';

const orderSchema = new Schema({
    userId: {
        type: String,
        default: 'Anonymous'
    },
    products: {
        type: Object,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    address: {
        type: Object,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;