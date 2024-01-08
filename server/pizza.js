const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://127.0.0.1:3000/pizzalar',
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));


mongoose.connect('mongodb+srv://celebisalih277:salih266@cluster0.4wktsa2.mongodb.net/PizzaHut', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


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


app.use(cors());
app.use(express.json());


app.get('/pizza', async (req, res) => {
  try {
    const data = await Pizza.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/pizza", async (req, res) => {
  try {
    const { tür, fiyatlar, image } = req.body;
    if (
      !fiyatlar ||
      typeof fiyatlar !== "object" ||
      !fiyatlar.büyük ||
      !fiyatlar.orta ||
      !fiyatlar.küçük
    ) {
      return res.status(400).json({ error: "Invalid fiyatlar structure" });
    }
     


    const newPizza = new Pizza({
      tür,
      fiyatlar,
      image,
    });
    const savedPizza = await newPizza.save();
    res.status(201).json(savedPizza);
  } catch (error) {
    res.status(500).json({ error: "internal Server Error" });
  }
});








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is active!');
});
