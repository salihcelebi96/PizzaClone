const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 3001;

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.gar7gdm.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB şeması ve modeli
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
      type: Number,
      required: true,
    },
    küçük: {
      type: Number,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
});

const Pizza = mongoose.model('Pizza', pizzaSchema);



// Express ortamı
app.use(cors());
app.use(express.json());

// API endpoint'i
app.get('/pizza', async (req, res) => {
  try {
    const data = await Pizza.find();
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
