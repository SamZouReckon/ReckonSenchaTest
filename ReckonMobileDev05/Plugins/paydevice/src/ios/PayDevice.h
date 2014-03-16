#import <Cordova/CDV.h>
#import "MPEAPI.h"

@interface PayDevice : CDVPlugin <MPETransactionProtocol>

- (void)doTransaction:(CDVInvokedUrlCommand*)command;    
- (void)isSecureDeviceConnected:(CDVInvokedUrlCommand*)command;

@property (nonatomic, strong) NSNumber *amount;

@end
