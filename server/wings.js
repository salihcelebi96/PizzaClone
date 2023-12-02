const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3002;

mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.gar7gdm.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});





const wingsSchema = new mongoose.Schema({
  id:String,
  tür: {
    type: String,
    required: true,
  },
  acıklama:{
    type:String,
    required: true,
  },
  fiyat: Number,
  url:String,
});

const Wing = mongoose.model('Wing', wingsSchema);

app.use(cors());
app.use(express.json());

app.get('/wings', async (req, res) => {
  try {
    const data = await Wing.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});
