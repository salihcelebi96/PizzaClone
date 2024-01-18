const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 3001;

app.use(cors());
app.use(fileUpload());
app.use(express.json());












mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  tls: true,
  tlsAllowInvalidCertificates: true
}

);

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