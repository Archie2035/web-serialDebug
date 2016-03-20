var SerialPort = require("serialport").SerialPort;
var serialPort;
var serialData;
function serialOpen(device,baud) {
    serialPort = new SerialPort(device, {
        baudrate: baud
    });
    serialPort.on("open", function () {
        console.log('open');
        serialPort.on('data', function (data) {
            console.log('data received: ' + data);
            serialData += data;
        });
    });
}
function serialClose() {
    serialPort.close();
}
function serialWrite(data) {
    serialPort.write(data, function (err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
}
function serialRead() {
    var dataBuffer = serialData;
    serialData = '';//清空
    return dataBuffer;
}
exports.open = serialOpen;
exports.close = serialClose;
exports.write = serialWrite;
exports.read = serialRead;