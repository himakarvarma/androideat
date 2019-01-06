'use strict';

exports.defaultroutes = function(req,res) {
	sendSuccess(res,"default page");
};

function sendSuccess(res, data) {
    res.writeHead(200, { "Content-Type" : "json"});
    //var output = { error: null, data: data };
    res.end(JSON.stringify(data) + "\n");
}

function sendFailure(res, server_code, err) {
    var code = (err.code) ? err.code : err.name;
    console.log('sendFailure - err:', err);
    res.writeHead(server_code, { "Content-Type" : "json"});
    res.end(JSON.stringify(err) + "\n");
}

exports.login = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  req.getConnection(function(err,connection) {
	connection.query('SELECT * FROM login WHERE username = ?',[username], function (error, results, fields) {
  if (error) {
     console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"username and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"username does not exits"
          });
    }
  }
  });
 });
}

exports.register = function(req,res) {
  var username = req.body.username;
  var password = req.body.password;
  req.getConnection(function(err,connection){
	connection.query("INSERT INTO login(username,password) VALUES(?,?)",[username,password],function(err,result) {
		if(err) throw err;
		res.send({
                "code":200,
                "success":"registeration success"
                });
	});
});
};
