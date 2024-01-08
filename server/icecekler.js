const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3004;

const corsOptions = {
  origin: ['http://127.0.0.1:3000/yanurunler', 'http://127.0.0.1:3000/icecekler'],
  methods: 'GET', 
};

app.use(cors(corsOptions));


mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const icecekSchema = new mongoose.Schema({
  tür: {
    type: String,
    required: true,
  },
  fiyat: {
    type: Number,
    required: true,
  },
  acıklama: {
    type: String,
    required: true,
  },
  image: {
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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});
