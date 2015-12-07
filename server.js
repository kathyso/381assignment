var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongodbURL = 'mongodb://kathyso.cloudapp.net:27017/test';
var mongoose = require('mongoose');

app.post('/',function(req,res) {
	//console.log(req.body);
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		rObj.address = {};
		if (req.body.building) rObj.address.building = req.body.building;
		if (req.body.street) rObj.address.street = req.body.street;
		if (req.body.zipcode) rObj.address.zipcode = req.body.zipcode;
		rObj.address.coord = [];
		if (req.body.lon&&req.body.lat) {
			rObj.address.coord.push(req.body.lon);
			rObj.address.coord.push(req.body.lat);
		}
		if (req.body.borough) rObj.borough = req.body.borough;
		if (req.body.cuisine) rObj.cuisine = req.body.cuisine;
		if (req.body.name) rObj.name = req.body.name;
		if (req.body.restaurant_id) rObj.restaurant_id = req.body.restaurant_id;

		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		var r = new Restaurant(rObj);
		//console.log(r);
		r.save(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant created!')
       		db.close();
			res.status(200).json({message: 'insert done', id: r._id});
    	});
    });
});

app.delete('/deleteall',function(req,res) {
	var criteria = {};
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done', id: req.params.id});
    	});
    });
});

app.delete('/:attrib/:attrib_value',function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done', id: req.params.id});
    	});
    });
});

app.delete('/address/:attrib/:attrib_value',function(req,res) {
	var criteria = {};
	criteria["address."+req.params.attrib] = req.params.attrib_value;
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria).remove(function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done', id: req.params.id});
    	});
    });
});

app.delete('/grade/:attrib/:attrib_value',function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib] = req.params.attrib_value;
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		rObj.grades = {};
		rObj.grades.date = req.body.date;
		rObj.grades.grade = req.body.grade;
		rObj.grades.score = req.body.score;
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria).remove(rObj,function(err) {
       		if (err) {
				res.status(500).json(err);
				throw err
			}
       		//console.log('Restaurant removed!')
       		db.close();
			res.status(200).json({message: 'delete done', id: req.params.id});
    	});
    });
});

app.get('/', function(req, res, next) {
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
  		Restaurant.find(function (err, results) {
    			if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
  		});
	});
});

app.get('/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});

app.get('/address/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria["address."+req.params.attrib] = req.params.attrib_value;
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});

app.get('/grade/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria["grades."+req.params.attrib] = req.params.attrib_value;
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.find(criteria,function(err,results){
       		if (err) {
				res.status(500).json(err);
				throw err
			}
			if (results.length > 0) {
				res.status(200).json(results);
			}
			else {
				res.status(200).json({message: 'No matching document'});
			}
			db.close();
    	});
    });
});

app.put('/:attrib/:attrib_value', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;

	console.log(criteria);
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.update(criteria,{$set:req.body},function(err){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				res.status(200).json({message: 'update done'});
			}
			db.close();
		});
	});
});

app.put('/:attrib/:attrib_value/grade', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;

	console.log(criteria);
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		rObj.grades = {};
		rObj.grades.date = req.body.date;
		rObj.grades.grade = req.body.grade;
		rObj.grades.score = req.body.score;
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.update(criteria,{$set:rObj},function(err){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				res.status(200).json({message: 'update done'});
			}
			db.close();
		});
	});
});

app.put('/:attrib/:attrib_value/address', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;

	console.log(criteria);
	
	var restaurantSchema = require('./models/restaurant');
	mongoose.connect('mongodb://kathyso.cloudapp.net:27017/test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rObj = {};
		rObj.address = {};
		rObj.address.building = req.body.building;
		rObj.address.street = req.body.street;
		rObj.address.zipcode = req.body.zipcode;
		rObj.address.coord = [];
		rObj.address.coord.push(req.body.lon);
		rObj.address.coord.push(req.body.lat);
		var Restaurant = mongoose.model('Restaurant', restaurantSchema);
		Restaurant.update(criteria,{$set:rObj},function(err){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				res.status(200).json({message: 'update done'});
			}
			db.close();
		});
	});
});

app.listen(process.env.PORT || 8099);
