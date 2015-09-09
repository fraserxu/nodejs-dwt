var formidable = require('formidable');
var util = require('util');
var path = require('path');
var express = require('express');
var fs = require('fs');
var app = express();


app.use(express.static(path.resolve(__dirname, './'))); // load static resources
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers","X-Requested-With, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/scan.html');
// })
app.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // console.log(util.inspect({
        //     fields: fields,
        //     files: files
        // }));

        fs.readFile(files.RemoteFile.path, function(err, data) {
        	// save file from temp dir to new dir
            var newPath = __dirname + "/uploads/" + files.RemoteFile.name;
            fs.writeFile(newPath, data, function(err) {
            	if (err) throw err;
            	console.log('file saved');
                res.end();
            });
        });
    });
})

var server = app.listen(2014, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
})
