const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        unique: "Duplicate Article Title"
    },
    summary:{
        type:String
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
      }],
      createdDate: {
        type: Date,
        default: Date.now
      },
      saved:{
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        required: true
      }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;