const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3004;



app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});


mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  tls: true,
  tlsAllowInvalidCertificates: true
}

);

const icecekSchema = new mongoose.Schema({
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


const Icecekler = mongoose.model('icecek', icecekSchema);



app.use(express.json());


app.get('/icecekler', async (req, res) => {
  try {
    const data = await Icecekler.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/icecekler', async (req, res) => { 
  const { tür, fiyat,  url } = req.body; 
  try {
    

    const savedIcecek = await Icecekler.create({
      tür,
      fiyat,
      url,
      
    });
    res.status(201).json(savedIcecek);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});












app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});