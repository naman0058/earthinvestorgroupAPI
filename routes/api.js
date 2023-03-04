var express = require('express');
var router = express.Router();
var pool =  require('./pool');
var sending = require('./msg_function');



router.get('/get-country',(req,res)=>{
    pool.query(`select * from country order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})


router.get('/get-amenities',(req,res)=>{
    pool.query(`select * from amenities order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/get-property_type',(req,res)=>{
    pool.query(`select * from property_type order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})


router.get('/get-state',(req,res)=>{
    pool.query(`select s.* , (select c.name from country c where c.id = s.countryid) as countryname from state s order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})


router.get('/get-developers',(req,res)=>{
    pool.query(`select d.* , (select c.name from country c where c.id = d.countryid) as countryname from developers d order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/get-projects',(req,res)=>{
    pool.query(`select p.* ,
    (select d.name from developers d where d.id = p.developersid) as developername,
    (select s.name from state s where s.id = p.stateid) as statename,
     (select c.name from country c where c.id = p.countryid) as countryname
      from projects p order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/get-agent',(req,res)=>{
    pool.query(`select a.* , (select c.name from country c where c.id = a.countryid) as countryname from agent a order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/get-listing',(req,res)=>{
    pool.query(`select l.* , 
    (select c.name from country c where c.id = l.countryid) as countryname,
    (select s.name from state s where s.id = l.stateid) as statename,
    (select d.name from developers d where d.id = l.developersid) as developername,
    (select p.name from projects p where p.id = l.projectid) as projectname,
    (select a.name from agent a where a.id = l.agentid) as agentname

     from listing l order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/get-listing-amenities',(req,res)=>{
    pool.query(`select * from listing_amenities where listingid = '${req.query.id}' order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})


router.get('/get-listing_imagess',(req,res)=>{
    pool.query(`select l.* , (select li.name from listing li where li.id = l.listingid) as listingname from listing_imagess l order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/get-brochure',(req,res)=>{
    pool.query(`select l.* , (select li.name from listing li where li.id = l.listingid) as listingname from brochure l order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})



router.get('/get-review',(req,res)=>{
    pool.query(`select l.* , (select li.name from listing li where li.id = l.listingid) as listingname from review l order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result);
    })
})


module.exports = router