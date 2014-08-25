#import <Cordova/CDV.h>
#import "CloudEftposSDK.h"

#pragma clang diagnostic ignored "-Warc-performSelector-leaks"

NSString *callBackId;
#if TRUE // TEST MODE
// This causes transactions to be done in training mode. No messages will be sent to the test host
NSString * const email = @"test";
NSString * const password = @"test";
#else
// This will set the SDK into dev mode - messages will go to a dev host
NSString * const email = @"tomg@questps.com.au";
NSString * const password = @"questSW1!";
#endif

@interface PayDevice : CDVPlugin

- (void)doTransaction:(CDVInvokedUrlCommand*)command;
//- (void)MPEinteractionEvent: (MPEbaseInteraction*) interaction;
//- (void)isSecureDeviceConnected:(CDVInvokedUrlCommand*)command;

@property (nonatomic, strong) NSNumber *amount;
@property (nonatomic, strong) CloudEftpos *cloudEftpos;

@end

@implementation PayDevice

@synthesize cloudEftpos;

-(void)doTransaction:(CDVInvokedUrlCommand*)command
{
    //[self.commandDelegate runInBackground:^{
    //Initialise the CloudEftpos Library and reconnect to the last PINpad if possible
    NSLog(@"Trying to load api.");
    cloudEftpos = [[CloudEftpos alloc] init];
    //NSLog(@"Exception: %@", theException);
    
    
    NSLog(@"CloudEftpos Loaded.");
    
    [cloudEftpos verifyCredentials:email password:password onCompletion:^(bool verified, NSError *error) {
        if (!verified)
        {
            // Cannot proceed. Should warn the user and try again later
            NSLog(@"Error verifying credentials: %@", [error localizedDescription]);
            return;
        }
        
        NSString *posName = @"unique POS Name";
        [cloudEftpos authorisePOS:posName onCompletion:^(bool authorised, NSError *error) {
            if (!authorised)
            {
                // Cannot proceed. Should warn the user and try again
                NSLog(@"Error authorising POS: %@", [error localizedDescription]);
                return;
            }
            
            // Now authorised. This authorisation code should not be called again.
            NSLog(@"Verified and authorised!");
        }];
    }];
    
    NSLog(@"CloudEftpos authenticated.");
    
    [cloudEftpos advancedMenuWithPresentingViewController:self.viewController
                                                 animated:YES
                                                  onClose:^{
                                                      
                                                  } onPrint:^(NSString *type, NSString *receipt) {
                                                      
                                                  }];
    
    
    /*[cloudEftpos pairDeviceWithPresentingViewController:self.viewController
                                               animated:true
                                           onCompletion:^(NSError *error) {
                                               if (error) {
                                                   NSLog(@"Error pairing to PINpad: %@", [error localizedDescription]);
                                                   return;
                                               }
                                               // PINpad is now paired - a status update should trigger to
                                               // indicate a "connected" state
                                           }];
     */
    //NSNumberFormatter * f = [[NSNumberFormatter alloc] init];
    //[f setNumberStyle:NSNumberFormatterDecimalStyle];
    //NSNumber * amount = [f numberFromString:[command.arguments objectAtIndex:0]];
    
    //NSLog(@"Converted amount to number.");
    //[[NSUserDefaults standardUserDefaults] setObject:@"https://mpos-global.test.point.fi:450/"
    //forKey:@"paymentengineurl"];
    //NSLog(@"Changed to NZ/AU.");
    //callBackId = command.callbackId;
    //NSLog(@"%@ amount = ", amount);
    //[MPEAPI instance].interactionDelegate = self;
    
    /*MPEpurchaseTransaction* transaction = [MPEpurchaseTransaction new];
     Transaction.amountPurchase = 95.00f;
     
     NSError* errorPtr;
     if (![[MPEAPI instance] MPEsubmitTransaction:transaction error:&errorPtr)
     {
     //Report any error for the failed submit. Use an alert view with
     // the error object for example.
     }
     
     //[MPEAPI initiatePurchaseTransactionWithInfo:@{@"amount": @"200.00", @"currency" : @"AUD"} andDelegate:self];*/
    //}];
}

/*-(void)MPEinteractionEvent:(MPEbaseInteraction*) interaction
 {
 MPEinteractionType interactionType = interaction.interactionType;
 
 switch(interactionType)
 {
 case ITDisplayMessage :
 {
 MPEdisplayMessageInteraction* displayInteraction = (MPEdisplayMessageInteraction*) interaction;
 
 NSLog(@"%@.",displayInteraction.message);
 //[self displayMessageInteraction:displayInteraction];
 
 break;
 }
 case ITPinEntry :
 {
 MPEpinEntryInteraction* displayInteraction = (MPEpinEntryInteraction*) interaction;
 
 NSLog(@"%@.",displayInteraction.message);
 //[self displayMessageInteraction:displayInteraction];
 
 break;
 }
 default:
 {
 // Unknown interaction event.
 NSLog(@"No interaction");
 NSAssert(NO, @"Unknown interaction event encountered.");
 break;
 }
 }
 }
 
 -(void) MPEtransactionResult:(MPETransactionStatus)transactionStatus transaction:(MPEbaseTransaction*)transaction error:(NSError*)error
 {
 /*switch(transactionStatus)
 {
 case accepted:
 {
 // Let the user know it worked.
 //[self displaySuccesfulTransaction:transaction];
 break;
 }
 case declined:
 {
 //[self displayDeclinedTransaction:transaction];
 break;
 }
 case error:
 {
 //[self displayTransactionError:transaction error:error];
 break;
 }
 default:
 {
 NSAssert(NO,@"Unknown transaction status received.");
 break;
 }
 }
 }
 
 -(void)transactionWasSuccesfulWithResults:(NSDictionary *)results
 {
 NSLog(@"Success.");
 
 CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:results];
 
 [self.commandDelegate sendPluginResult:pluginResult callbackId:callBackId];
 }
 
 -(void)transactionWasSuccesfulWithResults:(NSDictionary *)results
 {
 NSLog(@"Success.");
 
 CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:results];
 
 [self.commandDelegate sendPluginResult:pluginResult callbackId:callBackId];
 }
 
 -(void)transactionFailedWithResults:(NSDictionary *)results
 {
 NSLog(@"Failure.");
 
 CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:results];
 
 [self.commandDelegate sendPluginResult:pluginResult callbackId:callBackId];
 }
 
 -(void)presentTransactionList:(NSArray *)transactionList
 {
 
 }
 
 - (void)isSecureDeviceConnected:(CDVInvokedUrlCommand*)command
 {
 BOOL isDeviceConnected = [MPEAPI isSecureDeviceConnected];
 
 NSLog(@"%@",isDeviceConnected);
 
 NSMutableDictionary *jsonObj = [[NSMutableDictionary alloc] init];
 [jsonObj setValue:[NSNumber numberWithBool:isDeviceConnected] forKey:@"DeviceConnected"];
 
 CDVPluginResult *pluginResult = [ CDVPluginResult
 resultWithStatus    : CDVCommandStatus_OK
 messageAsDictionary : jsonObj
 ];
 
 [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
 }*/

@end