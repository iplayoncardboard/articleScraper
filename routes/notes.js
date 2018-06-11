const express = require("express");
const router = express.Router();
var db = require("../models");

router.get("/note", (req,res)=>{
    db.Note.find({}).then((dbNote)=>{
        res.json(dbNote);
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


router.post("/notes/:id", (req, res)=> {
    db.Note.remove({ _id: req.params.id })
      .then(function(dbNote) {
        return db.Note.findOneAndUpdate({ _id: req.params.id }, { justOne: true});
      })
      .then((dbNotes) => {
        res.json(dbNotes);
      })
      .catch(function(err) {
        res.json(err);
      });
  });


module.exports = router