const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const config = require('./config/config').get(process.env.NODE_ENV)
const { User } = require('./models/user')
const { Book } = require('./models/book')
const { auth } = require('./middleware/auth')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true })

app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static('client/build'))

//Get
app.get('/api/getBook',(req,res)=>{
    let id = req.query.id

    Book.findById(id, (err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send(doc)
    })
})

app.get('/api/books',(req,res)=>{
    let skip = parseInt(req.query.skip)
    let limit = parseInt(req.query.limit)
    let order = req.query.order

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send(doc)
    })
})
//Post
app.post('/api/book', (req,res)=>{    
    const book = new Book(req.body)    
    book.save((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post:true,
            bookId:doc._id
        })
    })
})

app.post('/api/user/register',(req,res)=>{
    const user = new User(req.body)

    user.save((err,doc)=>{        
        if(err) return res.json({success:false})
        res.status(200).json({success:true,user:doc})
    })
})

app.post('/api/user/login',(req,res)=>{
    let email = req.body.email
    User.findOne({'email':email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatched)=>{
            if(!isMatched) return res.json({isAuth:false,message:'Wrong Password'})
          
            user.generateToken((err,user)=>{
                if(err) return res.status(404).send(err)

                res.cookie('auth',user.token).send({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

app.get('/api/user/posts',(req,res)=>{
    Book.find({ownerId:req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err)
        res.send(docs)
    })
})

app.get('/api/logout', auth,(req,res)=>{
    req.user.deleteToken(req.token, (err,user)=>{
        if(err) return res.status(400).send(err)
        res.send(user)
    })
    
})

app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        firstName:req.user.firstName,
        lastName:req.user.lastName
    })

})

app.get('/api/getReviewer',(req,res)=>{
    let id = req.query.id
    User.findById(id,(err,doc)=>{
        if(err) return res.status(404).send(err)
        res.json({
            firstName:doc.firstName,
            lastName:doc.lastName
        })
    })
})

app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(404).send(err)
        res.status(200).send(users)
    })
})
//Update
app.post('/api/bookUpdate',(req,res)=>{
    Book.findByIdAndUpdate(req.body._id,req.body, {new:true},(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post:true,
            bookId:doc
        })
    })
})
//Delete
app.delete('/api/deleteBook',(req,res)=>{
    let id = req.query.id

    Book.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.json(true)
    })
})

if(process.env.NODE_ENV==='production'){
    const path = require('path')
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log('server is running')
})