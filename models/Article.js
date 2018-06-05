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
        saved: Boolean,
        default: false
      }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;