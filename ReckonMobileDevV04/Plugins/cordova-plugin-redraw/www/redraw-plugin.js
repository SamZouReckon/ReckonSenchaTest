var exec = require("cordova/exec");

var Redraw = function() {};

Redraw.invalidateWebView = function (delay, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "Redraw", "invalidateWebView", [delay]);
};

module.exports = Redraw;