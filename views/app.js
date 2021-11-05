const express = require('express');
const morgan = require('morgan'); // middleware used for logging.
const mongoose = require('mongoose');
const app=express();
const blogRoutes = require('../Routes/blogRoutes')


//connect to mongodb
const dbURI = 'mongodb+srv://belinjo1:test123@IntroToNode.meyc2.mongodb.net/IntroToNode?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=> app.listen(3000))
.catch((err)=> console.log(err));



// listen for requests
app.set('view engine','ejs');
app.set('views', 'C:/Users/Bleer/Documents/GitHub/Blog/views');


//MiddleWare & static files

app.use(express.static('public')); //midleware to make particular folders public
//in that case style.css files would be reached.


//Parses data from the form to a body object
app.use(express.urlencoded({extended:true}));

//// LOGGING ----------------------------------------------
// app.use((req,res,next)=>{
//     console.log('New Request Made:');
//     console.log('host: ', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next(); //in order to continue with the other functions.  
// })

app.use(morgan('dev')); //logging


//Mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res)=>{
// const blog = new Blog({
//     title:'New Blog 2',
//     snippet:'About the New Blog',
//     body:'This is the newest blog!'
// });
// blog.save()
// .then((result)=>{
//  res.send(result);
// })
// .catch((err)=>{
//     console.log(err);
// });
// });

// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('61814ce4e6aaaaefb8db426c')
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })



///-------------------------------------------------------


app.get('/',(req,res)=>{
   res.redirect('/blogs');
})


app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
})


app.use('/blogs',blogRoutes);


//404 page//
app.use((req,res)=>{
 res.status(404).render('error',{title:'404'});
})