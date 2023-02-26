var express = require('express');
var router = express.Router();
var pool =  require('./pool');
var upload = require('./multer');


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




router.post('/enquiry-submit',(req,res)=>{
  let body = req.body;
  body['date'] = sending.date_and_time

  pool.query(`insert into enquiry set ?`,body,(err,result)=>{
    if(err) throw err;
    else{
      res.json({msg:'success',status:200})
    }
  })
})




router.post('/enquiry-show',(req,res)=>{
  let body = req.body;
  body['date'] = sending.date_and_time

  pool.query(`select * from enquiry order by id desc`,body,(err,result)=>{
    if(err) throw err;
    else{
      res.json({msg:'success',status:200})
    }
  })
})







// Admin Functionality Ends














module.exports = router;
