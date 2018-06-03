const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ArticlSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    summary:{
        type:String
    }
});

const Article = mongoose.model("Article", ArticlSchema);

module.exports = Article;