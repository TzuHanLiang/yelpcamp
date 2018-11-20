let mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
    text: String,
    author: {
        // The id property points to an object id that references
        // a User document in the database's users colleciton.
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        // The username is simply a string that is the author's username.
        username: String,
    },
});

module.exports = mongoose.model("Comment", commentSchema);

// db.users.find()
// { "_id" : ObjectId("5bf11ef64c43138df38dbc9d"), 
// "username" : "LizLiang", 
// "salt" : "c99d2ea432d5689431e7e9e4f9c392de92fa6a18735b9b1893d411c7d7cf69c8", 
// "hash" : "4bab32e4661d3602383c40b8870381857b16a48400fe3f192088fbb6d253bf752b1bbcf7427360c034f43bcd0cd0bf43b199196a4f565ab825ca7d077a4529d1973357b4cc0f427a7f27467439599c26433d2b6aadb5fa00a33f8a2495e5b06c81062fd4ed1a6a6a6d43f67bfab4c66e95c4334006fab17b46b9e733fc131a511d8d8c47421447a1744b024b8e8ff4546f31837d01225ed44172af2bbac0d8e3e48073f27b2e4cfbd6308a356a0e06fa70175cafd773b7cb734bed78266ce8652cfc95dde47b23a3f87cef96e3557d5c1f020c6827ca9d843b5286e745c229eeb5f3cd96a5c42514e4e7650bdbe417384e6fdb665d3442d4a6df88faa938a00beebeec7e072b0dee05c79df3f9d349f2ee85d6eb2c016cafa5ea5c940f0f20160eda7cdcf9deff1ec8f0ba74b70a946b37a99fdc52b91fae247aab145f5fcca53cc9311133d247aa2410dcc06aa824dd9f63eee7ada15fc19f24885957c16bf94aa8bcae6cb8609cb60ceb144e6c4f1a07894cfc824d321a5948d253e64e0f6b0a127e0510ad6466a909f9b087d65fbe604d2c5afe08adff49679332aaee94c3594f5eed7dedb0630a0df77c0edd0e8cb9d43c6fc5c02c0a2ff7409ed8b7d84db97c1e3d4cc8199e7d4566849eb1222dda0c62ed3fc3b7c2c1b329267538d8d85f4cb2ffb4c5ec0039e1112cf30ae9c8d1bce3796e6efadf03ab9446db0b8f81",
//  "__v" : 0 }