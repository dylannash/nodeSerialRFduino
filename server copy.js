var http = require('http');
var fs = require('fs');
var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort("/dev/cu.usbserial-DC008NB8", {baudrate: 9600});

http.createServer(function (req, res) {


	console.log('connection');
	fs.readFile('index.html', function(err, data) {
		if (err) throw err;
		  res.writeHead(200);
  		res.end(data);
	});
}).listen(1337, 'localhost');

console.log('Server running at http://localhost:1337/');

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
    serialPort.write("blue", function(err, results) {
	    console.log('err ' + err);
	    console.log('results ' + results);
	  });
	});


});