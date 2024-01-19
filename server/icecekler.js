const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis');
const dotenv = require('dotenv');

const app = express();
const port = 3004;
dotenv.config();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

mongoose.connect(process.env.MONGODB_URI);

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

// Redis konfigürasyonu
const redisClient = redis.createClient({
  host: 'localhost', // Redis sunucu adresi
  port: 6379,         // Redis sunucu portu
  // password: 'your_password', // Eğer Redis sunucu yetkilendirme gerektiriyorsa, password alanını ekleyin
});

app.get('/icecekler', async (req, res) => {
  try {
    // Önce Redis'te veriyi ara
    redisClient.get('icecekler', async (err, cachedData) => {
      if (err) throw err;

      if (cachedData) {
        // Eğer Redis'te varsa, Redis'ten veriyi çek
        const parsedData = JSON.parse(cachedData);
        res.json(parsedData);
      } else {
        // Eğer Redis'te yoksa, MongoDB'den veriyi çek
        const data = await Icecekler.find();
        
        // Veriyi Redis'e ekle
        redisClient.setex('icecekler', 3600, JSON.stringify(data));

        res.json(data);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/icecekler', async (req, res) => {
  const { tür, fiyat, url } = req.body;

  try {
    const savedIcecek = await Icecekler.create({
      tür,
      fiyat,
      url,
    });

    // Eğer yeni bir içecek eklenirse, Redis önbelleğini geçersiz kıl
    redisClient.del('icecekler');

    res.status(201).json(savedIcecek);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});
