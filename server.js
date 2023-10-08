require("dotenv").config();
const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const users = require('./routes/users');
const companies = require('./routes/companies') ;
const zero = require('./routes/dupZero')
const employees = require('./routes/employees') ;
const expressValidator = require('express-validator')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, {

  useNewUrlParser: "true",
  useUnifiedTopology: "true"

})
.then(() => {
    console.log("Berhasil Konek | 200")
})
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function duplicateZeros(arr) {
  const length = arr.length;
  let i = 0;

  while (i < length) {
    if (arr[i] === 0) {
      for (let j = length - 1; j > i; j--) {
        arr[j] = arr[j - 1];
      }
      i++;
    }
    i++;
  }
}
app.get('/', function(req, res){
res.json({"task" : " REST API with node.js"});
});
// app.get('/api/v1', countries)
// public route
app.use('/api/v1/admin', users);

// private route

const apiUrl = 'https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json';

app.get('/api/v1/countries', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    const countries = response.data;

    // Mengekstrak parameter "name," "region," dan "timezones" dari setiap negara
    const extractedData = countries.map(country => ({
      name: country.name,
      region: country.region,
      timezones: country.timezones,
    }));

    res.json({status:201, code:"201", data:extractedData, message: "success"})
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan dalam mengambil data negara.' });
  }
});
app.post('/duplicateZeros', (req, res) => {
  const arr = req.body.arr;
  duplicateZeros(arr);
  res.json({ result: arr });
});
app.use('/api/v1/companies', validateUser, companies);
app.use('/api/v1/employees', validateUser, employees);
app.use('/api/v1',  zero);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: "access denied!", data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}


// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong :( !!!"});

});

app.listen(3000, function(){
	console.log('Node server listening on port 3000');
 
});

// const ds = async() => {
//   // const employee = await Employee.findById('652259af16a2e61324a9b37f')
//   // await employee.populate('company_id').execPopulate()
//   // console.log(employee)
//   const company = await Company.findById('652259af16a2e61324a9b37f')
//   await company.populate('employees').execPopulate()
//   console.log(company)

// }
