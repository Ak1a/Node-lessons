const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

class DBWorker {

  constructor() {

    mongoClient.connect((err, client) => {

      if (err) {
        return console.log(err);
      }

      this.dbClient = client;
      this.db = client.db("node_lessons");
      this.collectionPosts = this.db.collection('posts');
      this.collectionAdmin = this.db.collection('node_lessons');

    });

    process.on("SIGINT", () => {
      DBWorker.closeConection;
      process.exit();
    });
  }

  insertOnePost(post) {

    this.collectionPosts.insertOne(post, (err, result) => {

      if (err) {
        return console.log(err);
      }

      console.log(result.ops);

    });
  }

  addNewUser(user) {

    this.db.collection('users', (err, users) => {
        users.insertOne(user, (err) => {
          if (err) return console.log(err)
        })
    })

  }

  static closeConection() {
    this.dbClient.close();
  }
}


module.exports = DBWorker
