const mongoose = require('mongoose');

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
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
