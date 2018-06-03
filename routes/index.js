const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
var db = require("../models");

router.get('/', (req, res)=>{
    res.render('index');
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
          
            // console.log("TITLE: " + result.title);
            // console.log("SUMMARY: " + result.summary)
            
            db.Article.create(result)
            .then((dbArticle)=>{
                console.log(dbArticle);
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