package org.apache.cordova.plugin.redraw;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Redraw extends CordovaPlugin {

  @Override
  public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
    
    if(!"invalidateWebView".equals(action)) {
      return false;
    }

    // Post a request for a redraw on the UI thread, with the specified delay
    this.webView.postInvalidateDelayed(args.getLong(0));
    // final CordovaWebView view = this.webView;
    // cordova.getActivity().runOnUiThread(new Runnable() {
    //   public void run() {
    //       view.invalidate();
    //       callbackContext.success("done");
    //   }
    // });

    return true;
  }

}