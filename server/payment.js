const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3008;

const corsOptions = {
    origin: 'http://127.0.0.1:5173/payment', // İzin verilen alan adı (uygun bir şekilde değiştirilmelidir)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  

app.use(cors(corsOptions));

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB şeması ve modeli
const paymentSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  yourEmail: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastValid: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

// Model oluşturulurken veritabanı adını belirtin
const Payments = mongoose.model('payment', paymentSchema); // Updated model name to 'Tatlilar'

// Express ortamı
app.use(cors());
app.use(express.json());

// API endpoint'i
app.get('/payment', async (req, res) => { // Updated endpoint to '/tatlilar'
  try {
    const data = await Payments.find(); // Updated to use 'Tatlilar'
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
