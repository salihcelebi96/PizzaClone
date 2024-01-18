const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3003;



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


const kampanyaSchema = new mongoose.Schema({
  tür: {
    type: String,
    required: true,
  },
  fiyat: {
    type: Number,
    required: true,
  },
  acıklama: {
    type:String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});


const Kampanyalar = mongoose.model('Kampanyalar', kampanyaSchema);


app.use(cors());
app.use(express.json());


app.get('/kampanyalar', async (req, res) => {
  try {
    const data = await Kampanyalar.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});