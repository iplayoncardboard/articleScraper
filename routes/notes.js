const express = require("express");
const router = express.Router();
var db = require("../models");

router.get("/note", (req,res)=>{
    db.Note.find({}).then((dbNote)=>{
        res.json(dbNote);
    });
});


router.post("/note/:id", function(req, res) {
    console.log(`BODY ${JSON.stringify(req.body)}`);
    console.log(`ID ${req.params.id}` )
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push:{notes: dbNote._id }},{ new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

router.get("/note/:id", (req,res)=>{
    
    db.Note.find({id:req.params.id}).then((dbNote)=>{
        res.json(dbNote);
    })
    .catch((err)=>{
        if(err){
            res.json(err);
        }
    });;
});

router.delete("/note/:id",(req,res)=>{
    db.Note.deleteOne({id:req.params.id}).then(()=>{
        //Will need to change redirect path
        res.redirect('/');
    })
    .catch((err)=>{
        if(err){
            res.json(err);
        }
    });
});


module.exports = router