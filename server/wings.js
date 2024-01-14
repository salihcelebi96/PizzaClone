const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3002;



app.use(cors());


mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const wingsSchema = new mongoose.Schema({
  tür: {
    type: String,
    required: true,
  },
  Fiyat: {
    type: Number,
    required: true,
  },
  Açıklama: {
    type:String,
    required: true,
  },
  Url: {
    type: String,
    required: true,
  },
});


const Wings = mongoose.model('Wings', wingsSchema);


app.use(cors());
app.use(express.json());


app.get('/wings', async (req, res) => {
  try {
    const data = await Wings.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post('/wings', async (req, res) => {
  try {
    const { tür, Fiyat, Açıklama,  Url } = req.body;

    const newWings = new Wings({
      tür,
      Fiyat,
      Açıklama,
      Url,
    });

    const savedWings = await newWings.save();
    res.status(201).json(savedWings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});









app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});
