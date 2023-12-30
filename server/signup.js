const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 3006;
app.use(cors());

// MongoDB'ye bağlan
mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// MongoDB bağlantı hatası kontrolü
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('MongoDB connected successfully');
});

// Kullanıcı şemasını oluştur
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  password: String,
  isChecked1:Boolean,
  isChecked2:Boolean,
  isChecked3:Boolean
});

// Kullanıcı modelini oluştur
const User = mongoose.model('User', userSchema);

// JSON verilerini işlemek için body-parser middleware'ini kullan
app.use(bodyParser.json());

// Kullanıcı kaydı (signup) endpoint'i
app.post('/signup', async (req, res) => {
  try {
    // Gelen verileri al
    const { name, email, phoneNumber, password,isChecked1,isChecked2,isChecked3 } = req.body;

    // Kullanıcı modeli üzerinden yeni bir kullanıcı oluştur
    const newUser = new User({ name, email, phoneNumber, password,isChecked1,isChecked2,isChecked3 });

    // MongoDB'ye kaydet
    const savedUser = await newUser.save();

    // Başarılı yanıt gönder
    res.status(200).json({ message: 'Signup successful', user: savedUser });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Server'ı dinle
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
