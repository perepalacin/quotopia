export interface QuoteProps {
    _id: String;
    creator: String;
    author: String;
    quote: String;
    topics: String[]
    lastedit: Date;
    favs: Number
}

export enum QuotesPath {
    feed = "feed",
    profile = "profile",
    saved = "saved"
}