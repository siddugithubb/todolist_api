const Router= require('express')
const {connectToDb, getDb}=require('../db');
const { ObjectId } = require('mongodb');
const router=Router();


/* 
const todolist=[{
    title: "learn javascript",
    id:"1",

},
{
    title: "Submit the assignment",
    id:"2",
},
{
    title: "send an email",
    id:"3",
},
]; */
let db;
connectToDb((err)=>{
    if(err){
        console.log(err)
        process.exit(1)
    }
    db=getDb();
})


router.get('/', (req, res) => {
    //res.send(todolist)
    const arr=[]
    db.collection('todo')
      .find()
      .forEach(todos=>arr.push(todos))
      .then(() => {
        res.send(arr);
      })
      .catch(() => {
        console.log(err);
        res.status(500).send({ error: 'Error fetching todos' });
      });
     
});
 router.get('/:id',(req,res)=>{
  

    db.collection('todo')
      .findOne({_id: new ObjectId(req.params.id) })
      .then(doc => {
        if (doc) {
          res.send(doc);
        } else {
          res.status(404).send({ error: 'Todo item not found' });
        }
      })
      .catch(() => {
        res.status(500).send({ error: 'Error fetching todo' });
      });
});

 router.post("/", (req, res)=>{
    db.collection('todo')
      .insertOne(req.body)
      .then(() => {
        res.send({ message: 'Todo item created successfully'});
      })
      .catch(() => {
        res.status(500).send({ error: 'Error creating todo' });
      });

});

router.delete('/:id',(req,res)=>{
   db.collection('todo')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(() => {
        res.send({ message: 'Todo item deleted successfully' });
      })
      .catch(() => {
        res.status(500).send({ error: 'Error deleting todo' });
      });
});

router.put('/:id', (req, res) => {
   db.collection('todo')
     .updateOne(
       { _id: new ObjectId(req.params.id) },
       { $set: req.body }
     )
     .then(() => {
      res.send({ message: 'Todo item Updated successfully' });
    })
    .catch(() => {
      res.status(500).send({ error: 'Error Updating todo' });
    });
  }); 
module.exports = router;