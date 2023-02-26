var express = require('express');
var router = express.Router();






router.get('/read-files',(req,res)=>{
  var fs = require('fs');
  var path = require('path');
  var readStream = fs.createReadStream(path.join(__dirname, '../public/images/') + 'Companymaster.txt', 'utf8');
  let data = ''
  readStream.on('data', function(chunk) {
      data += chunk;
  }).on('end', function() {
      res.json(JSON.parse(data));
  });
})




router.get('/read-files-data',(req,res)=>{
  var fs = require('fs');
  var path = require('path');
  var readStream = fs.createReadStream(path.join(__dirname, '../public/images/') + 'Nse_Monthprice.txt', 'utf8');
  let data = ''
  readStream.on('data', function(chunk) {
      data += chunk;
  }).on('end', function() {
      res.json(JSON.parse(data));
  });
})















const { rtConnect, rtDisconnect, rtSubscribe, rtUnsubscribe, rtFeed, historical, formatTime } = require('truedata-nodejs')





const user = 'wssand050'
const pwd = 'john050'
const port = 8084
const symbols = ['NIFTY-I', 'BANKNIFTY-I', 'CRUDEOIL-I', 'INFY']; // symbols in array format
// rtDisconnect()


rtConnect(user, pwd, symbols, port, bidask = 1, heartbeat = 0, replay = 0);

// rtFeed.on('touchline', touchlineHandler);
// rtFeed.on('tick', tickHandler);
// rtFeed.on('bidask', bidaskHandler);
// rtFeed.on('bar', barHandler);
// rtFeed.on('marketstatus', marketStatusHandler)
// rtFeed.on('heartbeat', heartbeatHandler);

function touchlineHandler(touchline) {
  console.log(touchline);
}

function tickHandler(tick) {
  console.log(tick);
}

function bidaskHandler(bidask) {
  console.log(bidask);
}

function barHandler(bar) {
  console.log(bar);
}

function marketStatusHandler(status) {
  console.log(status);
}

function heartbeatHandler(heartbeat) {
    console.log(heartbeat);
}


function touchlineHandler(touchline){
  rtFeed.on('touchline', touchlineHandler);
  console.log('abc ka data',touchline)
  Data =  touchline;  
  return touchline;
  
}

var Data = touchlineHandler()



router.get('/api/demo',(req,res)=>{
  res.json({result:'hi working this api'})
})


router.get('/get-stock-list',(req,res)=>{
 const withNestedKeys = Object.entries(Data).map(entry => entry[1]);
res.render('data-read',{rows:withNestedKeys})
})



router.get('/data-read-details',(req,res)=>{
  

  from = formatTime(2022, 3, 15, 15, 15); // (year, month, date, hour, minute) // hour in 24 hour format
  to = formatTime(2022, 3, 18, 18, 15); // (year, month, date, hour, minute) // hour in 24 hour format
  
  historical
  .getBarData('',  (duration = '1W'), (interval = 'EOD'), (response = 'json'), (getSymbolId = 0))
  .then((resu) => res.render('data-read-details',{rows:resu,id:req.query.id}))
  .catch((err) => console.log(err));
})



historical
.getBarData('INFY',  (duration = '1W'), (interval = 'EOD'), (response = 'json'), (getSymbolId = 0))
.then((resu) => console.log(resu))
.catch((err) => console.log(err));



router.get('/data-read-details-date-wise',(req,res)=>{
  


let arr = []
  var chunks = req.query.date.split(/\s+/);
   arr = [chunks.shift(), chunks.join('')];


  let removestring = arr[1].toString().replace('-','')

  let from = arr[0].split('/')
  let to = removestring.split('/')

  
 from = formatTime(from[2], from[0].replace(/^0/,''), from[1].replace(/^0/,''), 9, 15); // (year, month, date, hour, minute) // hour in 24 hour format
 to = formatTime(to[2], to[0].replace(/^0/,''), to[1].replace(/^0/,''), 9, 15); // (year, month, date, hour, minute) // hour in 24 hour format
 


 historical
 .getBarData(req.query.id,  from,to, (interval = 'EOD'), (response = 'json'), (getSymbolId = 0))
 .then((resu) => res.render('data-read-details',{rows:resu,id:req.query.id}))
 .catch((err) => console.log(err));
})



// historical data reading start





// historical data reading ends





// Admin Functionality Starts


router.post('/admin-login',(req,res)=>{
  pool.query(`select * from admin where email = '${req.body.email}' and password = '${req.body.password}'`,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
    res.json({msg:'success',status:500})
    }
    else{
      res.json({msg:'invalid credentials',status:200})
    }
  })
})



router.post('/add-agent',(req,res)=>{
  let body = req.body;
  
  var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
  dd='0'+dd;
} 

if(mm<10) 
{
  mm='0'+mm;
} 
today = yyyy+'-'+mm+'-'+dd;


body['date'] = today

  pool.query(`insert into agent set ?`,body,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
    res.json({msg:'success',status:500})
    }
    else{
      res.json({msg:'invalid credentials',status:200})
    }
  })
})


// Admin Functionality Ends














module.exports = router;
