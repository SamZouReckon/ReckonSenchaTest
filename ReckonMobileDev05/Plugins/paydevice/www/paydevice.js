var exec = require('cordova/exec');

var PayDevice = function() {
};

PayDevice.StartTransaction = function() {
    cordova.exec(function (data) {
        //alert(JSON.stringify(data));
        //Success
           
       }, function (data) {
       //alert(JSON.stringify(data));
       //Failure
           
  	}, "PayDevice", "startTransaction", [this.data.Amount]);
};

PayDevice.ShowTools = function() {
    cordova.exec(function (data) {
        //alert(JSON.stringify(data));
        //Success
           
       }, function (data) {
       //alert(JSON.stringify(data));
       //Failure
           
  	}, "PayDevice", "showTools", []);
};

PayDevice.AuthorisePOS = function() {
    cordova.exec(function (data) {
        //alert(JSON.stringify(data));
        //Success
           
       }, function (data) {
       //alert(JSON.stringify(data));
       //Failure
           
  	}, "PayDevice", "authorisePOS", []);
};

PayDevice.Authenticate = function() {
    cordova.exec(function (data) {
        //alert(JSON.stringify(data));
        //Success
           
       }, function (data) {
       //alert(JSON.stringify(data));
       //Failure
           
  	}, "PayDevice", "Authenticate", []);
};

PayDevice.CreateEftposObject = function() {
    cordova.exec(function (data) {
        //alert(JSON.stringify(data));
        //Success
           
       }, function (data) {
       //alert(JSON.stringify(data));
       //Failure
           
  	}, "PayDevice", "createEftposObject", []);
};























