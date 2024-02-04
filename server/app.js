const express = require('express');



const icecekler = require('./icecekler');
const pizza = require('./pizza');
// const signup = require('./signup');
const admin = require('./admin');
const kampanyalar = require('./kampanyalar');
const tatli = require('./tatli');
const wings = require('./wings');
const payment = require('./payment');
const authRoutes = require('./loginJwt');

const cors = require('cors');


const app = express();
const PORT = 8080;



app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

app.use('/icecekler', icecekler);
app.use('/pizza', pizza);
// app.use('/signup', signup);
app.use('/admin', admin);
app.use('/kampanyalar', kampanyalar);
app.use('/tatlilar', tatli);
app.use('/loginjwt', authRoutes);
app.use('/wings', wings);
app.use("/payment", payment);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
