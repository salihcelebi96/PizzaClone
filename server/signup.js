const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 3006;
app.use(cors());


mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('MongoDB connected successfully');
});


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
  isChecked1:Boolean,
  isChecked2:Boolean,
  isChecked3:Boolean
});


const User = mongoose.model('User', userSchema);


app.use(bodyParser.json());


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

app.get('/users', async (req, res) => {
    try {
      // Tüm kullanıcıları MongoDB'den getir
      const users = await User.find({});
      
      // Başarılı yanıt gönder
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });





// Server'ı dinle
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
