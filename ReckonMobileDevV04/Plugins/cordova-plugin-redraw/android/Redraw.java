package org.apache.cordova.plugin.redraw;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Redraw extends CordovaPlugin {

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    
    if(!"invalidateWebView".equals(action)) {
      return false;
    }

    cordova.getActivity().runOnUiThread(new Runnable() {
      public void run() {
          this.webView.invalidate();
          callbackContext.success();
      }
    });

    return true;
  }

}