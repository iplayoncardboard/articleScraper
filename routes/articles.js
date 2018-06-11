const express = require("express");
const router = express.Router();
var db = require("../models");

router.post('/test',(req,res)=>{
    console.log(JSON.stringify(req.body));
})


router.get('/articles',(req,res)=>{
    db.Article.find({}).then((dbArticle)=>{
        // res.json(dbArticle);
      
         //create a handlebars object containing articles 
        let hbsObject = {article:dbArticle}
        //and send it to HBS on the index route
        res.render("index", hbsObject);
    }).catch((err)=>{
        if(err)
        {
            res.json(err);
        }
    });
});

//Grab an article
router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });   

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function(req, res) {
    console.log('BODY' +JSON.stringify(req.body));
    console.log('params' +JSON.stringify(req.params.id));
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
    .then(function(dbNote) {
        console.log("NOTE"+JSON.stringify(dbNote));
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { notes: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

router.put("/articles/:id",(req,res)=>{
    db.Article.update({_id:req.params.id},{$set:{saved:true}}).then((dbArticle)=>{
        //Will need to change redirect path
        res.json(dbArticle);
    })
    .catch((err)=>{
        if(err){
            res.json(err);
        }
    });
});

router.put("/articles/:id/remove",(req,res)=>{
    db.Article.update({_id:req.params.id},{$set:{saved:false}}).then((dbArticle)=>{
        //Will need to change redirect path
        res.json(dbArticle);
    })
    .catch((err)=>{
        if(err){
            res.json(err);
        }
    });
});




// router.delete("/articles/:id",(req,res)=>{
//     db.Article.deleteOne({id:req.params.id}).then(()=>{
//         //Will need to change redirect path
//         res.redirect('/');
//     })
//     .catch((err)=>{
//         if(err){
//             res.json(err);
//         }
//     });
// });

module.exports = router;