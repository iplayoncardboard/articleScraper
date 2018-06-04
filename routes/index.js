const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
var db = require("../models");

router.get('/', (req, res)=>{

    //get the articles from the DB
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
    })
});


// router.get("/", function(req, res) {
//     cat.all(function(data) {
//       var hbsObject = {
//         cats: data
//       };
//       console.log(hbsObject);
//       res.render("index", hbsObject);
//     });
//   });


// db.Article.find({})
// .then(function(dbArticle) {
//   // If we were able to successfully find Articles, send them back to the client
//   res.json(dbArticle);
// })
// .catch(function(err) {
//   // If an error occurred, send it to the client
//   res.json(err);
// });

router.get('/scrape', (req, res)=>{
    axios.get("http://www.dicetowernews.com/").then((response)=>{
        const $ = cheerio.load(response.data);
    
        // articleContainer = $("a, .entry-title, .item-details").text();
     
        articleContainer = $("div.item-details");
        // console.log(articleContainer)

        articleContainer.each(function (i, element) {
           
             //create an empty object to store the result
            let result = {}

            result.title = $(this).children("a, .entry-title").text();
            result.summary = $(this).text();
          
            db.Article.create(result)
            .then((dbArticle)=>{
                console.log(dbArticle);
                res.redirect("/");
            })
            .catch((err)=>{
                if(err){
                    return res.json(err);
                }
            });

        });
    
    
    });
});


module.exports = router;