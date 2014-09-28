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

-(void)createEftposObject:(CDVInvokedUrlCommand*)command;
-(void)Authenticate:(CDVInvokedUrlCommand*)command;
-(void)authorisePOS:(CDVInvokedUrlCommand*)command;
-(void)showTools:(CDVInvokedUrlCommand*)command;
-(void)startTransaction:(CDVInvokedUrlCommand*)command;

@property (nonatomic, strong) NSNumber *amount;
@property (nonatomic, strong) CloudEftpos *cloudEftpos;

@end

@implementation PayDevice

@synthesize cloudEftpos;

-(void)createEftposObject:(CDVInvokedUrlCommand*)command
{
    cloudEftpos = [[CloudEftpos alloc] init];
}

-(void)Authenticate:(CDVInvokedUrlCommand*)command
{
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
}

-(void)authorisePOS:(CDVInvokedUrlCommand*)command
{
    [cloudEftpos authorisePOS:@"Reckon Test" onCompletion:^(bool authorised, NSError *error) {
        if (authorised)
            NSLog(@"POS authorised");
        else
            NSLog(@"Authorisation failed");
    }];
}

-(void)showTools:(CDVInvokedUrlCommand*)command
{
    [cloudEftpos advancedMenuWithPresentingViewController:self.viewController
         animated:YES
          onClose:^{
              
          } onPrint:^(NSString *type, NSString *receipt) {
      
    }];
}

-(void)startTransaction:(CDVInvokedUrlCommand*)command
{
    // Get POS reference
    NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
    NSNumber *transCount = [prefs valueForKey:@"transCount"];
    if (transCount == nil)
    {
        transCount = [NSNumber numberWithInt:0];
    }
    transCount = [NSNumber numberWithInt:([transCount intValue] + 1)];
    [prefs setValue:transCount forKey:@"transCount"];
    
    // Add sequence number (different sequence number for different transactions in the one tender)
    int sequenceNumber = 1;
    NSString *posReference = [NSString stringWithFormat:@"%d%d", [transCount intValue], sequenceNumber];
    
    // Create TransactionRequest for $40
    TransactionRequest *tr = [[TransactionRequest alloc] init];
    [tr setAmount:4000];
    [tr setCashout:0];
    [tr setTipamount:0];
    [tr setTransactionType:Purchase];
    [tr setPosReference:posReference];
    
    // Enter transaction state
    [prefs setValue:posReference forKey:@"lastPosReference"];
    [prefs setValue:[NSNumber numberWithBool:YES] forKey:@"transactionInProgress"];
    // Store any other details for this transaction that will be required if there is a power failure or crash
    // This MUST be saved, otherwise there is a risk we could lose a transaction
    if (![prefs synchronize])
    {
        // Error, unable to save transaction state
        return;
    }
    
    // Start transaction
    [cloudEftpos startTransaction:tr
     withPresentingViewController:self.viewController
                         animated:true
                     onCompletion:^(NSDictionary *results, NSError *error) {
                         if (error) {
                             NSLog(@"Error with transaction: %@", [error localizedDescription]);
                             
                             UIAlertView *errorAlert = [[UIAlertView alloc]
                                                        initWithTitle: @"Error"
                                                        message: [error localizedDescription]
                                                        delegate:self
                                                        cancelButtonTitle:@"OK"
                                                        otherButtonTitles:nil];
                             [errorAlert show];
                             return;
                         }
                         // Extract data from result
                         bool approved = [(NSNumber *)[results valueForKey:@"approved"] boolValue];
                         NSString *responseCode = [results valueForKey:@"responseCode"];
                         NSString *responseText = [results valueForKey:@"responseText"];
                         // Do something with result...
                         NSLog(@"%@", results);
                         // Remove transaction state
                         [prefs setValue:[NSNumber numberWithBool:NO] forKey:@"transactionInProgress"];
                         
                         UIImage *image = [results valueForKey:@"signatureImage"];
                         if (image != nil)
                         {
                             // Convert UIImage to JPEG
                             NSData *imgData = UIImageJPEGRepresentation(image, 1); // 1 is compression quality
                             
                             // Identify the home directory and file name
                             NSString  *jpgPath = [NSHomeDirectory() stringByAppendingPathComponent:@"Documents/Test.jpg"];
                             
                             // Write the file.  Choose YES atomically to enforce an all or none write. Use the NO flag if partially written files are okay which can occur in cases of corruption
                             [imgData writeToFile:jpgPath atomically:YES];
                         }
                     }];
}

@end