#import "PayDevice.h"
#import <Cordova/CDV.h>
#import "MPEAPI.h"

NSString *callBackId;

@implementation PayDevice

    - (void)doTransaction:(CDVInvokedUrlCommand*)command
    {
        [self.commandDelegate runInBackground:^{
            NSLog(@"%@.",[command.arguments objectAtIndex:0]);  

            //NSNumberFormatter * f = [[NSNumberFormatter alloc] init];
            //[f setNumberStyle:NSNumberFormatterDecimalStyle];
            //NSNumber * amount = [f numberFromString:[command.arguments objectAtIndex:0]];
            
            NSLog(@"Converted amount to number.");
            [[NSUserDefaults standardUserDefaults] setObject:@"https://mpos-global.test.point.fi:450/" 
                                              forKey:@"paymentengineurl"];  
            NSLog(@"Changed to NZ/AU.");    
            callBackId = command.callbackId;   
            //NSLog(@"%@ amount = ", amount);         

            [MPEAPI initiatePurchaseTransactionWithInfo:@{@"amount": @"200.00", @"currency" : @"AUD"} andDelegate:self];
        }];
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
    }

@end