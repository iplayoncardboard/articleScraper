const express = require("express");
const router = express.Router();
var db = require("../models");

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


router.get('/articles/:id',(req,res)=>{
    console.log(req.params.id);
    db.Article.find({_id: req.params.id}).then((dbArticle)=>{
        res.json(dbArticle);
    }).catch((err)=>{
        if(err)
        {
            res.json(err);
        }
    });;
});

router.delete("/note/:id",(req,res)=>{
    db.Article.deleteOne({id:req.params.id}).then(()=>{
        //Will need to change redirect path
        res.redirect('/');
    })
    .catch((err)=>{
        if(err){
            res.json(err);
        }
    });
});

module.exports = router;