import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/phone_store', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log('Connection established');
}).on('error', error => {
    console.log('Connection error:', error);
});

export default mongoose;