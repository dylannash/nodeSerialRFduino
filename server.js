var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort("/dev/cu.usbserial-DC008NB8", {baudrate: 9600});

var ledSend;

app.listen(3030);

function handler(req, res) {
	console.log('connection');

	fs.readFile('index.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

serialPort.on("open", function () {
	console.log('open');

	serialPort.on('data', function(data) {
	  console.log('data received: ' + data);
	});

	ledSend = function (ledColor) {
		console.log("Led color is: " + ledColor);
	  serialPort.write(ledColor, function (err, results) {
			console.log('err ' + err);
		  console.log('results ' + results);
		});
	};
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('boxClick', function (data, err) {
  	var LEDCOLOR;
  	if (data.color == 'r') {
  		LEDCOLOR = 'r';
  	} else if (data.color == 'g') {
  		LEDCOLOR = 'g';
  	} else if (data.color == 'b') {
  		LEDCOLOR = 'b';
  	}
  	ledSend(LEDCOLOR);
  });
});


