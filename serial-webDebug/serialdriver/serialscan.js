var serialPort = require("serialport");
var serialArray = [];

function scanCom(){
    if(serialArray.length){
        serialArray = [];
    }
    serialPort.list(function (err, ports) {
        ports.forEach(function(port) {
            var thePort = {
                'comName':port.comName,
                'pnpId':port.pnpId,
                'manufacturer':port.manufacturer
            };
            if(port.comName.indexOf('USB') >= 0){
                serialArray.push(thePort);
            }

        });

    });
}
scanCom();
setInterval(function () {
    scanCom();
},2000);

module.exports = function() {
    return serialArray;
}