const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'customer',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});
app.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM information', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});





app.post('/', (req, res) => {
    
    console.log(req.body,"this is req body");
    var det={
      "FirstName":req.body.FirstName,
      "LastName":req.body.LastName,
      "Address":req.body.Address,
     "City":req.body.City,
     "State":req.body.State,
     "TotalOrder":req.body.TotalOrder
    }
      mysqlConnection.query('INSERT INTO information SET ?',det, (err, rows, fields) => {
          if (err){
              console.log(err);
          }   
          else{
            console.log('The solution is: ', rows);
          }
        })
  });

  app.delete('/:id', (req, res) => {
    console.log(req.params.id,"guru idu query");
        
      
    
    mysqlConnection.query('DELETE FROM information WHERE FirstName=?', [req.params.id],(err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});



  app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));