var express = require('express');
var router = express.Router();
var serialScan = require('../serialdriver/serialscan');
var serialData = require('../serialdriver/serialdata');
var renderData= {
  'serialData':serialScan(),
  title:"WEB SerialPort"
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',renderData);
});
/* 打开串口 */
router.post('/serialStart', function(req, res, next) {
  serialData.open(req.body['com'],req.body['baud']);
  res.send({"serialOpen": "OK"});

});
/* 关闭串口 */
router.get('/serialStop', function(req, res, next) {
  res.send({"serialStop": "OK"});
});
router.post('/serialSend', function(req, res, next) {
  serialData.write(req.body['data']);
  res.send({"serialSendState":"OK"});
});
router.get('/querySerialData', function(req, res, next) {
  var dataBuffer = serialData.read();
  res.send({"serialData":dataBuffer});
});

module.exports = router;
