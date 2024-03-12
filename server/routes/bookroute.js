import express from "express"
import { book } from "../models/bookmodel.js"
const router= express.Router()
// Add Book
router.post('/', async(req,res)=>{
    try{
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
          ){
            return res.status(401).send({
                message: 'Send all required fields: title, author, publishYear',
          });
    }
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear:req.body.publishYear,
      };
  
      const books = await book.create(newBook);
  
      return res.status(201).send(books);
}
    catch(err){
        console.log(err)
        res.send({message:err.message}).status(400)
    }
})
// Get all books
router.get('/',async (req,res)=>{
    try{
   const books= await book.find()
   return res.status(200).send({
    count: books.length,
    data: books
   })}
   catch(err){
    console.log(err)
    res.send({message:err.message}).status(400)
   }
})
// Find a book by id
router.get('/:id',async (req,res)=>{
    try{
   const {id}=req.params
   const books= await book.findById(id)
   return res.status(200).send(books)}
   catch(err){
    console.log(err)
    res.send({message:err.message}).status(400)
   }
})
// Update a book
router.put('/:id',async(req,res)=>{
    try{
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
          ){
            return res.status(401).send({
                message: 'Send all required fields: title, author, publishYear',
          });
    }
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear:req.body.publishYear,
      };
      const {id}=req.params
      const books = await book.findByIdAndUpdate(id,newBook);
  
      return res.status(201).send(books);
    }
    catch(err){
        console.log(err)
        res.send({message:err.message}).status(400)
    }
})
// Delete a book
router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const books= await book.findByIdAndDelete(id)
        if(books){
        return res.status(200).send(books)}
        else{
            return res.status(404).send('No books found')
        }
    }
    catch(err){
    console.log(err)
    res.send({message:err.message}).status(400)   
    }
})

export default router