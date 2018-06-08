const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
var db = require("../models");

router.get('/', (req, res)=>{

    //get the articles from the DB
    db.Article.find({}).sort({createdDate:1}).then((dbArticle)=>{
        // res.json(dbArticle);s
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
            result.url = $(this).children("a, .entry-title").children("a").attr("href");
            result.saved = false;
            try{db.Article.create(result)
                .then((dbArticle)=>{
                    res.redirect("/");
                })}
            catch(error) {
                console.error(error);
                // expected output: SyntaxError: unterminated string literal
                // Note - error messages will vary depending on browser
                }
            
            // .catch((err)=>{
            //     if(err){
            //         console.log(err);
            //     }
            // });

        });
    });
});


router.get('/saved',(req, res)=>{
    db.Article.find({saved:true}).sort({createdDate:1}).then((dbArticle)=>{
        let hbsObject = {article:dbArticle}
        res.render('saved',hbsObject);
    });
});


module.exports = router;