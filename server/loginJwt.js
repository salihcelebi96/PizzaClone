const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import JWT library
require('dotenv').config();
const secretKey = process.env.SECRET_KEY || 'defaultSecret';




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
  isChecked1: Boolean,
  isChecked2: Boolean,
  isChecked3: Boolean
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { name, email, phoneNumber, password, isChecked1, isChecked2, isChecked3 } = req.body;
    const newUser = new User({ name, email, phoneNumber, password, isChecked1, isChecked2, isChecked3 });
    const savedUser = await newUser.save();
    res.status(200).json({ message: 'Signup successful', user: savedUser });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login endpoint with JWT
// Login endpoint with JWT
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (user && user.password === password) {
        // Create a JWT token using your secret key from environment variables
        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '7d' });
  
        // Send the token back to the client
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });






// Örnek: Protected endpoint
app.get('/protected', (req, res) => {
  try {
    // Token'ı al
    const token = req.headers.authorization.split(' ')[1];

    // Token'ı doğrula
    const decodedToken = jwt.verify(token, secretKey);

    // Token doğrulandıysa, istemciye korunan veriyi gönder
    res.status(200).json({ message: 'Protected data', user: decodedToken });
  } catch (error) {
    // Token doğrulanamazsa veya hata olursa hata mesajı gönder
    console.error('Error during protected data fetch:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});







  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
