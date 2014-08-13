var exec = require('cordova/exec');

var PayDevice = function() {
};

PayDevice.echo = function() {
    cordova.exec(function (data) {
        //alert(JSON.stringify(data));
        //Success
           
       }, function (data) {
       //alert(JSON.stringify(data));
       //Failure
           
  	}, "PayDevice", "doTransaction", [this.data.Amount]);
};