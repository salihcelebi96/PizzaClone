const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;



app.use(cors());


mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const adminSchema = new mongoose.Schema({
    email: {
      type: String, 
      required: true,
    },
    password: {
      type: String, 
      required: true,
    },
  });
  


const admins = mongoose.model('admin',adminSchema); 

// Express ortamı

app.use(express.json());

// API endpoint'i
app.get('/admin', async (req, res) => { 
  try {
    const data = await admins.find(); 
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});
