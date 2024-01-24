const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = 3001;



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
// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI);

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