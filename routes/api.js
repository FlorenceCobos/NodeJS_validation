var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    url = "mongodb://localhost:27017/it-exam";

MongoClient.connect(url,
{useNewUrlParser:true},
  
  function(err, client) {
    if (err) throw err;
  
    let db = client.db('it-exam') ;



/* GET users listing. */
router.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next()
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//TEST 1
router.get('/monuments/Attignat', function(req, res, next) {
  db.collection('monuments').find({city:'Attignat'}).toArray(function(error, result) {
  return res.json(result) ;
    
  })
});
//TEST 2
router.delete('/monuments/Arbent', function(req, res, next) {
  db.collection('monuments').deleteMany({city : "Arbent"}, function(error, result) {
    return res.json(result) ;
  })
});
//TEST 3
router.post('/monuments/Attignat', function(req, res, next) {

  var test3 = {
    postcode : "01340",
    city : "Attignat",
    departement : "Ain",
    region : "Rhône-Alpes",
    population : "2,9"
    }
  
  db.collection('monuments').insertOne(test3,{content : req.body.content}, function(error, result) {
    return res.json(result) ;
  })
});

//TEST 4

router.get('/monuments-count/Attignat', function(req, res, next) {
  db.collection('monuments').find({city:'Attignat'}).count(function(error, result) {
  return res.json(result) ;
  })
});
//TEST 5

router.put('/monument/010080054W', function(req, res, next) {
  db.collection('monuments').updateOne({id :"010080054W"}, {$set:{"housenumbers" :  {"13" : {content : req.body.content }}}}, function(error, result) {
  return res.json(result) ;
})
});

//TEST 6

router.get('/monument-geo/01434A080S', function(req, res, next) {
  db.collection('monuments').find({city: 'Versailleux', name: "Lotissement Le Village"}).toArray(function(error, result) {
  return res.json(result) ;
    
  })
});
//TEST 7

router.put('/monument-geo/01434A080S', function(req, res, next) {
  db.collection('monuments').findOne({id:"01434A080S"}).updateOne({"lat":"45.979665", "lon":"5.102479"}, function(error, result) {
  return res.json(result) ;
})
});

//TEST 8 

router.put('/compare/01434A080S/010080054W', function(req, res, next) {
 /* var r = (a > b) ? 'oui' : 'non'
  if (a>b){
   echo r="oui"; 
  }else{
    echo r="non"; 
  }*/
  db.collection('monuments').updateOne({lat:"45.979665", lon:"5.102479"}, {$set:{"housenumbers" :  {"13" : {content : req.body.content }}}}, function(error, result) {
  return res.json(result) ;
})
});


});
module.exports = router;
