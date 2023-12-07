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
mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB şeması ve modeli
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

// Model oluşturulurken veritabanı adını belirtin
const Kampanyalar = mongoose.model('Kampanyalar', kampanyaSchema);

// Express ortamı
app.use(cors());
app.use(express.json());

// API endpoint'i
app.get('/kampanyalar', async (req, res) => {
  try {
    const data = await Kampanyalar.find();
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
