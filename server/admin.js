const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 4000;
const dotenv = require('dotenv');
const router = express.Router();




app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

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



app.use(express.json());


router.get('/', async (req, res) => { 
  try {
    const data = await admins.find(); 
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;