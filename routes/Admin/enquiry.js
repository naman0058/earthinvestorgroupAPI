var express = require('express');
var router = express.Router();
var pool =  require('../pool');
var upload = require('../multer');
var table = 'enquiry'
var sending = require('../msg_function');





router.post('/insert',(req,res)=>{
    let body = req.body;
    body['date'] = sending.date_and_time
  
    pool.query(`insert into ${table} set ?`,body,(err,result)=>{
      if(err) throw err;
      else{
        res.json({msg:'success',status:200})
      }
    })
  })
  
  
  router.get(`/show`,(req,res)=>{
    pool.query(`select * from ${table} order by id desc`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })


  router.get(`/country-wise`,(req,res)=>{
    pool.query(`select * from ${table} where countryid= '${req.body.countryid}' order by id desc`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })
  


  router.get(`/city-wise`,(req,res)=>{
    pool.query(`select * from ${table} where cityid= '${req.body.countryid}' order by id desc`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })
  

  


module.exports = router;