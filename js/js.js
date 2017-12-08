var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
var user = express.Router();

app.use(bodyParser.urlencoded({}));
app.use("/user", user);

var pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "1207",
	port: 3306
})

user.post("/list", function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	var user = req.body.user;
	var title = req.body.title;
	var bookname = req.body.bookname;
	var texts = req.body.texts;
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log("connection" + err);
		}
		connection.query("insert into fenye(user,title,bookname,texts) values(?,?,?,?)", [user, title, bookname, texts], function(err, data) {
			if(err) {
				console.log("mysql" + err);
			}
			console.log(data);
			res.send(data);
			connection.end();
		})
	})
})
user.post("/huoqu", function(req, res) {
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log("connection" + err);
		}
		connection.query("select * from fenye", function(err, data) {
			if(err) {
				console.log("mysql" + err);
			}
			console.log(data);
			res.send(data);
			connection.end();
		})
	})
})
app.use(express.static("./../www"));
app.listen(8000, function() {
	console.log("启动........");
})