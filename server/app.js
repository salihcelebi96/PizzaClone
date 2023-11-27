// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');

// const Blog = require('./models/blogs');

// const app = express();
// const dbUrl = "mongodb+srv://celebisalih277:salih266@cluster0.gar7gdm.mongodb.net/"

// mongoose.connect(dbUrl)
//     .then(() => {
//         app.listen(3000, () => {
//             console.log('Server is running on port 3000');
//         });
//     })
//     .catch((err) => {
//         console.error("MongoDB connection error:", err);
//     });


// app.set('view engine', 'ejs');

// app.use(express.static("public"));
// app.use(morgan("dev"));

// app.get('/', (req, res)=> {
//      Blog.find()
//      .then((result)=>{
//         res.render("index",{title:"Anasayfa",blogs:result})
//      })
//      .catch((err)=>{
//         console.log(err)
//      })
// })

// app.get("/blog/:id", (req,res)=>{
//     const id = req.params.id
//     Blog.findById(id)
//     .then((result)=>{
//         res.render("blog",{blog:result,title:"Detay"})
//     })
// })



// //ekleme kısmı
// app.get("/add", (req, res) => {
//     const blog = new Blog({
//         title: "yeni yazı2",
//         short: "kısa açıklama",
//         long: "uzun açıklama"
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.send("An error occurred while saving the blog.");
//         });
// });



// //verileri çekme kısmı

// app.get("/all",(req, res) => {
//     Blog.find()
//      .then((result) => {
//         res.send(result)
//      })
//      .catch((err) => {
//         console.log(err)
//      })
// })


// //id ye göre veri çek
// app.get('/single', (req, res) => {
//    Blog.findById("655f3e7c685ee25fee60ebe3")
//    .then((result) => {
//     res.send(result)
//    })
//    .catch((err)=> {
//     console.log(err)
//    })
// })