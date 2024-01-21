const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const app = express();
const port = 3001;

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(fileUpload());
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

dotenv.config();


mongoose.connect(process.env.MONGODB_URI);
const pizzaSchema = new mongoose.Schema({
  tür: {
    type: String,
    required: true,
  },
  fiyatlar: {
    büyük: {
      type: Number,
      required: true,
    },
    orta: {
      type:  Number,
      required: true,
    },
    küçük: {
      type:  Number,
      required: true,
    },
  },
  url: {
    type: String, // Resmi URL olarak sakla
    required: true,
  },
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

app.get('/pizza', async (req, res) => {
  try {
    const data = await Pizza.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/pizza', async (req, res) => {
  const { url, tür, fiyatlar } = req.body;
  try {
    // Create a new pizza document directly using create
    const savedPizza = await Pizza.create({
      tür,
      fiyatlar,
      url,
    });

    res.status(201).json(savedPizza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});