const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ArticlSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        unique: "Duplicate Article Title"
    },
    summary:{
        type:String
    }
});

const Article = mongoose.model("Article", ArticlSchema);

module.exports = Article;