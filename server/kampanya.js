const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 3003;


const corsOptions = {
  origin: 'http://127.0.0.1:3000/kampanyalar', // İstemcinin bulunduğu adres
  methods: 'GET', // Sadece GET isteklerine izin ver
};

app.use(cors(corsOptions));


// MongoDB bağlantısı
mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.gar7gdm.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB şeması ve modeli
const KampanyaSchema = new mongoose.Schema({
   tür: {
    type: String,
    required: true,
  },
  fiyat: {
    type:Number,
    required:true, 
   
  },
  image: {
    type: String,
    required: true,
  },
});

const Kampanya = mongoose.model('kampanya', KampanyaSchema);



// Express ortamı
app.use(cors());
app.use(express.json());

// API endpoint'i
app.get('/kampanya', async (req, res) => {
  try {
    const data = await Kampanya.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});
