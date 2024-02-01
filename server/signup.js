// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const dotenv = require('dotenv');
const router = express.Router(); 
const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('MongoDB connected successfully');
});

app.use(bodyParser.json());

router.post('/', async (req, res) => {
  try {
    const { name, email, phoneNumber, password, isChecked1, isChecked2, isChecked3 } = req.body;
    
    
    res.status(200).json({ message: 'Signup successful'/*, user: savedUser */ });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    // UserModel kullanımını kaldırın
    // const users = await UserModel.find({});
    
    // Burada gerekli işlemleri gerçekleştirin

    res.status(200).json({ /*users*/ });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
