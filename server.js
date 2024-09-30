const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://inquisitiveprogramming:cQvn1YKaixenblgo@cluster0.6uzyd.mongodb.net/inquisitiveBaking?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const orderSchema = new mongoose.Schema({
    product: String,
    price: String,
    buyer: String,
    orderID: String
});

const Order = mongoose.model('Order', orderSchema);

// Middleware to parse JSON
app.use(express.json());

app.post('/submit-order', async (req, res) => {
    try {
        const newOrder = new Order({
            product: req.body.product,
            price: req.body.price,
            buyer: req.body.buyer,
            orderID: req.body.orderID
        });
        await newOrder.save();
        res.status(200).json({ message: 'Order saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving order', error });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
