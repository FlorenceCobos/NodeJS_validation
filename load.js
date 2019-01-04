console.log('hello')

var MongoClient = require('mongodb').MongoClient, fs = require('fs'), url = "mongodb://localhost:27017/it-exam";;



MongoClient.connect(url, {useNewUrlParser:true}, function(err, client) {
    if (err) throw err;
    let db = client.db('it-exam');
    let els = fs.readFileSync('./bin/extract.txt', 'utf8').split("\n");
    db.collection('monuments').drop();
    for (var i in els) {
      try {
        if(els[i])
          db.collection('monuments').insertOne(JSON.parse(els[i]));
      } catch(e) {
        console.log(e);
      }
    }
  }
);