const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3005;



app.use(cors());


// MongoDB bağlantısı
mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  tls: true,
  tlsAllowInvalidCertificates: true
}

);

// MongoDB şeması ve modeli
const tatliSchema = new mongoose.Schema({
  tür: {
    type: String,
    required: true,
  },
  fiyat: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});


const Tatlilar = mongoose.model('tatli', tatliSchema);


app.use(express.json());


app.get('/tatlilar', async (req, res) => {
  try {
    const data = await Tatlilar.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/tatlilar', async (req, res) => {
  try {
    const { tür, fiyat, url } = req.body;

    const newTatlı = new Tatlilar({
      tür,
      fiyat,
      url,
    });

    const savedTatlı = await newTatlı.save();
    res.status(201).json(savedTatlı);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});