import { Schema } from 'mongoose';
import mongoose from '../mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        default: null
    },
    cartItems: {
        type: Array,
        default: []
    }
});

const User = mongoose.model('User', userSchema);

export default User;