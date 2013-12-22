var exec = require("cordova/exec");

var Redraw = function() {};

Redraw.invalidateWebView = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, "Redraw", "invalidateWebView", []);
};

module.exports = Redraw;