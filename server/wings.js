const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 3002;

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.gar7gdm.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB şeması ve modeli
const wingsSchema = new mongoose.Schema({
    tür: {
      type: String,
      required: true,
    },
    soslar: [{
      type: String,
      required: true,
    }],
    adetler: {
      '6 Adet': {
        type: Number,
        required: true,
      },
      '12 Adet': {
        type: Number,
        required: true,
      },
      '24 Adet': {
        type: Number,
        required: true,
      },
    },
  });

const Wing = mongoose.model('Wing', wingsSchema);



// Express ortamı
app.use(cors());
app.use(express.json());

// API endpoint'i
app.get('/wings', async (req, res) => {
  try {
    const data = await Wing.find();
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
