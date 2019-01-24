const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true});

module.exports.addPost = function (post){

  mongoClient.connect(function (err, client) {

    if(err){
      return console.log(err);
    }

    const db = client.db("node_lessons");
    const collection = db.collection('posts');

    collection.insertOne(post, function(err, result){

      if(err){
        return console.log(err);
      }
      console.log(result.ops);
      client.close();
    });
  });

};

