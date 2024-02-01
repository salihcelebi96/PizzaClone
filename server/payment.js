const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;
const dotenv = require('dotenv');
const router = express.Router(); 

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json()); 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const paymentSchema = new mongoose.Schema({
  totalPrice: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastDate: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
});

const Payments = mongoose.model('payment', paymentSchema);

router.get('/', async (req, res) => {
  try {
    const data = await Payments.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, lastDate, cvc, cardNumber, totalPrice } = req.body;
    const newPayment = new Payments({ name, lastDate, cvc, cardNumber, totalPrice });
    await newPayment.save();
    res.status(201).json({ message: 'Payment saved successfully!' });
  } catch (error) {
    console.error('Error during payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;