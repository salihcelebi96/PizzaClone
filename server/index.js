
const express = require('express');
const router = express.Router();


const admin = require('./admin');
const icecekler = require('./icecekler');
const kampanyalar = require('./kampanyalar');
const login = require('./loginJwt');
const payment = require('./payment');
const pizza = require('./pizza');
const signup = require('./signup');
const tatlı = require('./tatlı');
const wings = require('./wings');

const app = express();


app.use('/admin', admin);
app.use('/icecekler', icecekler);
app.use('/kampanyalar', kampanyalar);
app.use('/loginJwt', login);
app.use('/payment', payment);
app.use('/pizza', pizza);
app.use('/signup', signup);
app.use('/tatlı', tatlı);
app.use('/wings', wings);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`All servers are running on port ${port}`);
});
