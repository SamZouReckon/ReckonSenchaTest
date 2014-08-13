package com.Reckon.PayDevice;

import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.text.InputType;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.commonsware.cwac.merge.MergeAdapter;
import com.questps.cloudeftpossdk.CloudEftposSDK;
import com.questps.cloudeftpossdk.callbacks.OnAdvancedMenuClosed;
import com.questps.cloudeftpossdk.callbacks.OnAuthCompleted;
import com.questps.cloudeftpossdk.callbacks.OnDisplayUpdate;
import com.questps.cloudeftpossdk.callbacks.OnPINpadCommission;
import com.questps.cloudeftpossdk.callbacks.OnPairingCompleted;
import com.questps.cloudeftpossdk.callbacks.OnPrint;
import com.questps.cloudeftpossdk.callbacks.OnPromptUpdate;
import com.questps.cloudeftpossdk.callbacks.OnSignaturePrompt;
import com.questps.cloudeftpossdk.callbacks.OnStatus;
import com.questps.cloudeftpossdk.callbacks.OnTransactionCompleted;
import com.questps.cloudeftpossdk.callbacks.OnUpdateCompleted;
import com.questps.cloudeftpossdk.messages.AuthCompleted;
import com.questps.cloudeftpossdk.messages.DisplayData;
import com.questps.cloudeftpossdk.messages.ErrorResult;
import com.questps.cloudeftpossdk.messages.PINpadCommission;
import com.questps.cloudeftpossdk.messages.PINpadCommissionResponse;
import com.questps.cloudeftpossdk.messages.PairingCompleted;
import com.questps.cloudeftpossdk.messages.PrintData;
import com.questps.cloudeftpossdk.messages.PromptData;
import com.questps.cloudeftpossdk.messages.SignaturePromptData;
import com.questps.cloudeftpossdk.messages.StatusChange;
import com.questps.cloudeftpossdk.messages.TransactionCompleted;
import com.questps.cloudeftpossdk.messages.TransactionRequest;
import com.questps.cloudeftpossdk.messages.UpdateCompleted;

import java.util.ArrayList;

import static com.questps.cloudeftpossdk.CloudEftposSDK.TransactionType;
import static com.questps.cloudeftpossdk.CloudEftposSDK.TransactionType.*;
import static com.questps.cloudeftpossdk.CloudEftposSDK.TransactionType.Purchase;
import static com.questps.cloudeftpossdk.CloudEftposSDK.TransactionType.Refund;

public class PayDevice extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if ("Test".equals(action)) {
			return true;
		}
		return false;
	}

}
