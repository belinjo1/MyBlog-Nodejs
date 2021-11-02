const express = require('express');
const morgan = require('morgan'); // middleware used for logging.
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app=express();


//connect to mongodb
const dbURI = 'mongodb+srv://belinjo1:test123@IntroToNode.meyc2.mongodb.net/IntroToNode?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=> app.listen(3000))
.catch((err)=> console.log(err));



// listen for requests
app.set('view engine','ejs');
app.set('views', 'C:/Users/Bleer/Viti3/nodeJs/NodeJsFirstApp/views');


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

//blog routes

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
     res.render('index',{title:'All Blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

//Post method to insert data to database
app.post('/blogs',(req,res)=>{
const blog = new Blog(req.body);
blog.save()
.then((result)=>{
    res.redirect('/blogs');
})
.catch((err)=>{
    console.log(err);
})
})

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details',{blog:result,title:'Blog Details'})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.delete('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{console.log(err);})
})


app.get('/blog',(req,res)=>{
    res.render('blog',{title:'Blog'});
})

app.get('/createblog',(req,res)=>{
    res.render('create',{title:'Create Blog'});
})

//404 page//
app.use((req,res)=>{
 res.status(404).render('error',{title:'404'});
})