var mysql = require('mysql')
const express = require('express');
const app = express();
var bodyparser = require('body-parser');
var path = require('path');
const cors = require('cors');
const uuid = require('uuid'); 

app.use(express.static('public'))
app.use(express.json())
app.use(cors({ origin: true }));
app.use(bodyparser.json({limit: '50mb'})); 
app.use(bodyparser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
   
    res.header("Access-Control-Allow-Origin", "*");    
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE ");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


// database connection 
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rideandcare'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/', function(req, res) {
  return "Ride and Care"
})

  // select user form database
  app.post('/users',function(req,res) {
    return new Promise(resolve => {
    var data = con.query("select * from register",function(err,result) {
            if (err) throw err;
            res.send(result);
        })
    })
    
})









  // register 01

app.post('/register', function(req, res){
    var name = req.body.name;
    var emailid=req.body.emailid;
    var password=req.body.password;
    var repeat_passsword = req.body.repeat_passsword;

    var sql = `INSERT INTO register (name, emailid, password, repeat_passsword ) VALUES ( "${name}", "${emailid}", "${password}", "${repeat_passsword}")`;
    console.log(sql);
   
    var data = con.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted',result);
      res.send(result);
    });
})


// contact-us

app.post('/contactus', function(req, res){
  var id = req.body.id;
  var name = req.body.name;
  var emailid=req.body.emailid;
  var description=req.body.description;

  var sql = `INSERT INTO contactus (id,name, emailid, description ) VALUES ("${id}", "${name}", "${emailid}", "${description}")`;
  console.log(sql);
 
  var data = con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted',result);
    res.send(result);
  });
})


// booking service data insert into databse api


app.post('/bookingformdata', function(req, res){

  var id = req.body.id;
  var request_state = req.body.request_state;
  var service_token=uuid.v4()
  var username = req.body.username;
  var emailid=req.body.emailid;
  var mobile_number=req.body.mobile_number;
  var Location = req.body.Location.toLowerCase( ) ;
  var vehicle_type = req.body.vehicle_type;
  var selected_service = req.body.selected_service;
  var vehicle_maker = req.body.vehicle_maker;
  var vehicle_model_name = req.body.vehicle_model_name;
  var service_date = req.body.service_date;
  var time_slot = req.body.time_slot;
  var description = req.body.description;

  var sql = `INSERT INTO booking_service_details (id,request_state, service_token, username, emailid, mobile_number, Location, vehicle_type, selected_service, vehicle_maker, vehicle_model_name, service_date, time_slot, description ) VALUES ( "${id}","${request_state}", "${service_token}", "${username}", "${emailid}","${mobile_number}", "${Location}", "${vehicle_type}", "${selected_service}",
  "${vehicle_maker}", "${vehicle_model_name}", "${service_date}", "${time_slot}","${description}")`;
  console.log(sql);
 
  var data = con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted',result);
    res.send(result);
  });
})

// booking service list

app.post('/bokkingservicelist',function(req,res) {
  return new Promise(resolve => {
  var data = con.query("select * from booking_service_details",function(err,result) {
          if (err) throw err;
          res.send(result);
      })
  })
  
})


// user-details api
app.post('/userdetails', function(req, res){

  var id = req.body.id;
  var Name = req.body.Name;
  var surname=req.body.surname;
  var mobileno=req.body.mobileno;
  var emailid = req.body.emailid;
  var dob = req.body.dob;
  var city = req.body.city;
  var state = req.body.state;
  var country = req.body.country  ;
  var pincode = req.body.pincode;
  var vehicle_type = req.body.vehicle_type;
  var vehicle_maker = req.body.vehicle_maker;
  var vehicle_model_name = req.body.vehicle_model_name;

  var sql = `INSERT INTO user_details (id, Name, surname, mobileno, emailid, dob, city, state, country, pincode, vehicle_type, vehicle_maker, vehicle_model_name ) VALUES ( "${id}", "${Name}", "${surname}", "${mobileno}","${emailid}", "${dob}", "${city}", "${state}","${country}", "${pincode}", "${vehicle_type}", "${vehicle_maker}","${vehicle_model_name}")`;
  console.log(sql);
 
  var data = con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted',result);
    res.send(result);
  });
})

// userdetail get from database api
app.post('/getuserdetail',function(req,res) {
  return new Promise(resolve => {

    
  var data = con.query(`SELECT * FROM user_details`,function(err,result) {
          if (err) throw err;
          res.send(result);     
      })
  })
  
})



// sevice list details of user insert api
app.post('/service_plan_active', function(req, res){

  var id = req.body.userID;
  var serviceId = req.body.serviceId;
  var planName=req.body.planName;
  var type=req.body.type;
  var price = req.body.price;
  var provided_service_list = req.body.provided_service_list;

  var sql = `INSERT INTO subscription_plan_list (id, serviceId, planName, type,price,provided_service_list ) VALUES ( "${id}", "${serviceId}", "${planName}", "${type}", "${price}", "${provided_service_list}")`;
  console.log(sql);
 
  var data = con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted',result);
    res.send(result);
  });
})


// active plan list select form databse api
app.post('/select_active_plan',function(req,res) {
  return new Promise(resolve => {
  var data = con.query(`SELECT * FROM subscription_plan_list`,function(err,result) {
          if (err) throw err;
          res.send(result);     
      })
  })
  
})



  // register mech 01

  app.post('/registermech', function(req, res){
    var name = req.body.name;
    var emailid=req.body.emailid;
    var password=req.body.password;
    var repeat_password = req.body.repeat_passsword;
    var city = req.body.city;

    var sql = `INSERT INTO mech_register (name, emailid, password, repeat_password,city) VALUES ( "${name}", "${emailid}", "${password}", "${repeat_password}","${city}")`;
    console.log(sql);
   
    var data = con.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted',result);
      res.send(result);
    });
})

  // select mech form database
  app.post('/mechdata',function(req,res) {
    return new Promise(resolve => {
    var data = con.query("select * from mech_register",function(err,result) {
            if (err) throw err;
            res.send(result);
        })
    })
    
})


  // select admin form database
  app.post('/admindata',function(req,res) {
    return new Promise(resolve => {
    var data = con.query("select * from admin_register",function(err,result) {
            if (err) throw err;
            res.send(result);
        })
    })
    
})


  // select userdetails form database
  app.post('/userdetailget',function(req,res) {
    return new Promise(resolve => {
    var data = con.query("select * from user_details",function(err,result) {
            if (err) throw err;
            res.send(result);
        })
    })
    
})

  // select mechlist form database
  app.post('/mechlist',function(req,res) {
    return new Promise(resolve => {
    var data = con.query("select * from mech_register",function(err,result) {
            if (err) throw err;
            res.send(result);
        })
    })
    
})

  // select contact-us list form database
  app.post('/get-contactlist',function(req,res) {
    return new Promise(resolve => {
    var data = con.query("select * from contactus",function(err,result) {
            if (err) throw err;
            res.send(result);
        })
    })
    
})

// approved request for booking form
app.post('/approvedreq', function(req, res){

  const query = 'UPDATE `booking_service_details` '+ 'SET `request_state` = ? ' + 'WHERE `service_token` = ?';
  const values = ['Approved',req.body.service_token];
  console.log(query);
 
  var data = con.query(query,values,function(err, result) {
    if (err) throw err;
    console.log('record inserted',result);
    res.send(result);
  });
})

// delete request for booking form
app.post('/deletebookingreq', function(req, res){

  const query = 'DELETE FROM  `booking_service_details`  WHERE `service_token` = ?';
  const values = [req.body.service_token];
  console.log(query);
 
  var data = con.query(query,values,function(err, result) {
    if (err) throw err;
    console.log('record deleted',result);
    res.send(result);
  });
})

// delete user form database
app.post('/deleteuser', function(req, res){

  const query = 'DELETE FROM  `register`  WHERE `id` = ?';
  const values = [req.body.id];
  console.log(query);
 
  var data = con.query(query,values,function(err, result) {
    if (err) throw err;
    console.log('record deleted',result);
  });


  const query2= 'DELETE FROM  `user_details`  WHERE `id` = ?';
  const values2 = [req.body.id];
  console.log(query);
 
  var data = con.query(query2,values2,function(err, result) {
    if (err) throw err;
    console.log('record deleted',result);
    res.send(result);
  });
})


// delete mech form data bas
app.post('/deletemech', function(req, res){

  const query = 'DELETE FROM  `mech_register`  WHERE `id` = ?';
  const values = [req.body.id];
  console.log(query);
 
  var data = con.query(query,values,function(err, result) {
    if (err) throw err;
    console.log('record deleted',result);
    res.send(result);
  });
})

//  server on

  app.listen(8000)

  

