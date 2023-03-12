var express = require('express');
var router = express.Router();
var pool =  require('../pool');
var upload = require('../multer');
var table = 'agent'
var sending = require('../msg_function');



router.get('/dashboard',(req,res)=>{



  var today = new Date();
  today.setDate(today.getDate() - 7);
  
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;


  var query = `select count(id) as total_country from country;`
  var query1 = `select count(id) as total_state from state;`
  var query2 = `select count(id) as total_developers from developers;`
  var query3 = `select count(id) as total_projects from projects;`
  var query4 = `select count(id) as total_agent from agent;`
  var query5 = `select count(id) as total_listing from listing;`
  var query6 = `select count(id) as total_enquiry from enquiry;`
  var query7 = `select count(id) as today_enquiry from enquiry where date = CURDATE();`
  var query8 = `select count(id) as some_days_enquiry from enquiry where date >= '${today}';`

  pool.query(query+query1+query2+query3+query4+query5+query6+query7+query8,(err,result)=>{
    if(err) throw err;
    else res.render('Admin/dashboard',{result})
  })

})


router.get('/dashboard/:name', (req, res) => {
  res.render(`Admin/${req.params.name}`)
})




router.post('/dashboard/store-listing/:name/insert',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 8 } ,  { name: 'single_event_image', maxCount: 8 } , { name: 'tree_image', maxCount: 8 } ]),(req,res)=>{
  let body = req.body
  body['date'] = sending.date_and_time()


  if(req.files.single_event_image){
      body['image'] = req.files.image[0].filename;
      body['icon'] = req.files.icon[0].filename;
      body['single_event_image'] = req.files.single_event_image[0].filename;
      body['tree_image'] = req.files.tree_image[0].filename;

   console.log(req.body)
     pool.query(`insert into ${req.params.name} set ?`,body,(err,result)=>{
         err ? console.log(err) : res.json({msg : 'success'})
     })
  }

else if(req.files.image){


  body['image'] = req.files.image[0].filename;


 pool.query(`insert into ${req.params.name} set ?`,body,(err,result)=>{
     err ? console.log(err) : res.json({msg : 'success'})
 })
}

else if(req.files.image){
  body['icon'] = req.files.icon[0].filename;
console.log(req.body)
 pool.query(`insert into ${req.params.name} set ?`,body,(err,result)=>{
     err ? console.log(err) : res.json({msg : 'success'})
 })
}



else {
console.log(req.body)
 pool.query(`insert into ${req.params.name} set ?`,body,(err,result)=>{
     err ? console.log(err) : res.json({msg : 'success'})
 })
}


  
 
})




router.get('/dashboard/store-listing/:name/delete', (req, res) => {
  let body = req.body
  pool.query(`delete from ${req.params.name} where id = ${req.query.id}`, (err, result) => {
      if(err) {
          res.json({
              status:500,
              type : 'error',
              description:err
          })
      }
      else {
          res.json({
              status:200,
              type : 'success',
              description:'successfully delete'
          })
      }
  })
})




router.post('/dashboard/store-listing/:name/update', (req, res) => {
  let body = req.body
  pool.query(`update ${req.params.name} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
      if(err) {
          res.json({
              status:500,
              type : 'error',
              description:err
          })
      }
      else {
          res.json({
              status:200,
              type : 'success',
              description:'successfully update'
          })

          
      }
  })
})





router.post('/dashboard/store-listing/:name/update-image',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 8 } ,  { name: 'single_event_image', maxCount: 8 } , { name: 'tree_image', maxCount: 8 } ]), (req, res) => {
  let body = req.body;


  if(req.files.icon){
      body['icon'] = req.files.icon[0].filename;
    
    }
    else {
      body['image'] = req.files.image[0].filename;
    }

    

 
    
    


pool.query(`update ${req.params.name} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
      if(err) {
          res.json({
              status:500,
              type : 'error',
              description:err
          })
      }
      else {
            res.redirect(`/admin/dashboard/${req.params.name}`)
      }
  })


})





router.post('/listing/insert',upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'image', maxCount: 100 }  ]),(req,res)=>{
  let body = req.body
  body['date'] = sending.date_and_time()


console.log('icon',req.body);



pool.query(`insert into listing(countryid,stateid,developersid,projectid,agentid,name,description,address,icon,date,propertytypeid) 
values('${body.countryid}' , '${body.stateid}' , '${body.developersid}' , '${body.projectid}' , '${body.agentid}' , '${body.name}' , 
'${body.description}' , '${body.address}' , '${req.files.icon[0].filename}', '${req.body.date}' , '${req.body.propertytypeid}')`,(err,result)=>{
    if(err) throw err;
    else {
      console.log(result.insertId)
      let insertid = result.insertId;
      

      for(i=0;i<body.checkboxes.length;i++){
        pool.query(`insert into listing_amenities(listingid , amenitiesid,date) values('${insertid}' , '${body.checkboxes[i]}','${req.body.date}')`,(err,result)=>{
          if(err) throw err;
          else {console.log('done')}
        })
      }


      for(i=0;i<req.files.image.length;i++){
        pool.query(`insert into listing_imagess(listingid , image,date) values('${insertid}' , '${req.files.image[i].filename}' , '${req.body.date}')`,(err,result)=>{
          if(err) throw err;
          else {console.log('done')}
        })
      }
    
      res.redirect('/admin/dashboard/listing')

    }
})




  
 
})




router.post('/listing/update',(req,res)=>{
  let body = req.body

  let a = JSON.parse(req.body.b)




pool.query(`update listing set countryid = '${body.countryid}' ,stateid = '${body.stateid}' ,developersid = '${body.developersid}' ,
projectid = '${body.projectid}' ,agentid = '${body.agentid}' ,name = '${body.name}' ,description = '${body.description}' ,
address = '${body.address}' where id = '${body.id}'`,(err,result)=>{
    if(err) throw err;
    else {

      pool.query(`delete from listing_amenities where listingid = '${body.id}'`,(err,result)=>{
        if(err) throw err;
        else {
          for(i=0;i<a.length;i++){




            pool.query(`insert into listing_amenities(listingid , amenitiesid) values('${body.id}' , '${a[i]}')`,(err,result)=>{
              if(err) throw err;
              else {console.log('done')}
            })
          }
        }
res.json({msg:'success'})

      })

     

    }
})




  
 
})




router.get('/dashboard/enquiry/history',(req,res)=>{
  pool.query(`select e.* , 
  
  (select c.name from country c where c.id = (select l.countryid from listing l where l.id = e.listingid)) as countryname,
  (select s.name from state s where s.id = (select l.stateid from listing l where l.id = e.listingid)) as statename,
  (select d.name from developers d where d.id = (select l.developersid from listing l where l.id = e.listingid)) as developername,
  (select p.name from projects p where p.id = (select l.projectid from listing l where l.id = e.listingid)) as projectname,
  (select a.name from agent a where a.id = (select l.agentid from listing l where l.id = e.listingid)) as agentname,
  (select l.name from listing l where l.id = e.listingid) as listingname
  from enquiry e order by id desc`,(err,result)=>{
    if(err) throw err;
    else res.render('Admin/enquiry',{result})
  })
})






router.get('/logout',(req,res)=>{
  req.session.adminid = null;
  res.redirect('/admin/login')
})





router.get('/login',(req,res)=>{
  res.render('Admin/login',{msg : ''})

})



router.post('/verification',(req,res)=>{
    let body = req.body
   

pool.query(`select * from admin where email = '${req.body.email}' and password = '${req.body.password}'`,(err,result)=>{
  if(err) throw err;
  else if(result[0]) {
    console.log(result[0].id)
      req.session.adminid = result[0].id
   res.redirect('/admin/dashboard')
  }
  else {
    res.render('Admin/login',{msg : '* Invalid Credentials'})
  }
})
   })




module.exports = router