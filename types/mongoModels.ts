import {Schema, model, models} from "mongoose";

const QuoteSchema = new Schema({
    creator:{
        type: String,
        ref: "User",
    },
    author: {
        type: String,
        required: [true, "An author is required"],
    },
    quote:{
        type: String,
        required: [true, "Quote contents are required"],
    },
    topics: [{
        type: String,
    }],
    lastedit: {
        type: Date,
        default: Date.now
    },
    favs:{
        type: Number,
    }
    //Define the name of the collecion
}, {collection: 'quotes'});

const Quote = models.Quote || model("Quote", QuoteSchema, "quotes");

export default Quote;