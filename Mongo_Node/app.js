// ------------------ Setup -------------------------
// step 1 : npm init / npm init y
// step 2 : npm install express --save
// after some initial coding, install nodemon globally or locally => npm install -g nodemon
// OR you can run program from node => node app.js
// install mongo db driver => npm install mongodb

const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

// init app & middleware
const  app = express()
app.use(cors());
app.use(express.json());

//db connection
let db

connectToDb((err) =>{
    if (!err){
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

// app.listen(3000, () => {
//     console.log('app listening on port 3000')
// })

// routes
app.get('/', (req, res)=>{
    res.json({mssg: "Welcome to the Node.js Mongodb"})
})

app.get('/books', (req, res)=>{
    let page = req.query.p || 0;
    const booksPerPage = 2;
    let books = []

    console.log(`page: ${page}`);

    // Implement pagination
    db.collection('books')
        .find()
        //.sort({author: 1})
        .skip(page*booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(()=>{
            res.status(500).json({error: 'Could not fetch the documents'})
        })

    // // --------- return all  (max 20 items) -------------------
    // db.collection('books')
    //     .find() // return curson toArray forEach
    //     .sort({author: 1})
    //     .forEach(book => books.push(book))
    //     .then(() => {
    //         res.status(200).json(books)
    //     })
    //     .catch(()=>{
    //         res.status(500).json({error: 'Could not fetch the documents'})
    //     })
})

// add changeable route parameter
app.get('/books/:id', (req, res) => {
    //req.params.id => get id parameter
    if (ObjectId.isValid(req.params.id)){
        db.collection('books')
            .findOne({_id: new ObjectId(req.params.id)})
        .then((doc) => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not fetch the document'})
        })
    } else{
        res.status(500).json({error: 'Not a valid doc id.'})
    }    
})

app.get('/books/author/:name', (req, res) => {
    let authorName = req.params.name;
    let books = []
    db.collection('books')
        .find({author: authorName})
        .forEach((book) => {
            books.push(book)            
        })
        .then(() => {
            res.status(200).json(books)            
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the documents.'})
        })
})

app.get('/books/rating/:id', (req, res) => {
    let bookRating = parseInt(req.params.id);    
    let books = []
    db.collection('books')
        .find({rating: bookRating})
        .forEach((book) => {
            books.push(book)            
        })
        .then(() => {
            res.status(200).json(books)            
        })
        .catch((err) => {
            res.status(500).json({error: 'Could not fetch the documents.'})
        })
})

app.post('/books', (req, res) => {
    // get the body of post request
    const book = req.body
    console.log(book)
    //res.status(200).json(book)
    db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                err: 'Could not add a new document'
            })
        })
})

app.delete('/books/:id', (req, res) => {
    let bookId = req.params.id;
    console.log(`delete id: ${bookId}`);

    if (ObjectId.isValid(bookId)){
        db.collection('books')
            .deleteOne({_id: new ObjectId(bookId)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: 'Could not delete the document'
                })
            })
    } else {
        res.status(500).json({
            error: 'Not a valid doc id'
        })
    }
})

app.patch('/books/:id', (req, res) => {
    const updates = req.body;
    let updateId = req.params.id;
    console.log(`update Id: ${updateId}`)
    
    if (ObjectId.isValid(updateId)){
        console.log(`Id ${updateId} is valid`);
        db.collection('books')
        .updateOne({_id: new ObjectId(updateId)},{$set: updates})
        .then(result => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({
                err: 'Could not update the document'
            })
        })
    } else{
        res.status(500).json({
            error: 'Object Id is not valid'
        })
    }
})