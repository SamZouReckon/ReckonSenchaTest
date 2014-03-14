//
//  MPEAPI.h
//  MPEAPI
//
//  Created by Sævarður Einarsson on 2/15/13.
//  Copyright (c) 2013 Stokkur Software. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

/************************************ Transaction protocol ************************************/

@protocol MPETransactionProtocol <NSObject>

- (void)transactionWasSuccesfulWithResults:(NSDictionary *)results;
// format: {"success":bool, "amount":NSNumber, "transactionID":NSString, "message":NSString}

- (void)transactionFailedWithResults:(NSDictionary *)results;
// format: {"success":bool, "amount":NSNumber, "transactionID":NSString, "message":NSString}

- (void)presentTransactionList:(NSArray *)transactionList;
// format: [{"transactionID": "1", "amount": "12300", "stan": "00021", "date": "20130313", "time": "1351", "cardName": "Visa", "status": "APPROVED"},...]

@end

/************************************ Device info protocol ************************************/

@protocol MPEDeviceInfoProtocol <NSObject>

- (void)secureDeviceStatus:(NSDictionary *)status;
// format: {@"cpuuniqueid": NSString, @"serialnumber": NSString, @"bootswid": NSString, @"appswid": NSString, @"hardwareident":NSString};


- (void)secureDeviceConfig:(NSDictionary *)config;
// format: {@"timeanddate": NSDate, @"tamperstatus": NSString, @"batterylevel": NSNumber, @"batterystatus": bool};

@end


@interface MPEAPI : NSObject

/************************************ Singleton instance methods ************************************/

+ (MPEAPI *)instance; // returns a singleton instance of the MPEAPI object

- (void)createInstance; // to be called in applicationDidLaunch to create the instance
- (void)resumeInstance; // to be called in applicationDidBecomeActive to resume the instance and login again
- (void)closeInstance;  // to be called in applicationDidEnterBackground to end all active tasks


/************************************ Properties ************************************/

@property (nonatomic, strong) UIColor *themeColor;
// default: [UIColor redColor]

@property (nonatomic, strong) NSString *overlayViewFooterText;
@property (nonatomic, strong) UIImage *overlayViewFooterImage;

@property (nonatomic) BOOL promptForEmail;
// prompt for email to send receipt, default YES

@property (nonatomic, strong, readonly) NSString *mpeVersion;
// example: @"MPEAPI version X.X"

@property (nonatomic, strong, readonly) NSString *authenticationToken;
// example: @"48933948uoifgjsdf8943"

@property (nonatomic, strong, readonly) NSDictionary *currencyInfo;
// format: {"code":NSString, "name":NSString, "decimals":NSString}
// example: {"code":"0978", "name":"EUR", "decimals":"2"}

@property (nonatomic, strong, readonly) NSDictionary *agreementInfo;
// format: {"name":NSString, "acquirerID":NSString, "cardAcceptorID":NSString}
// format: {"name":"Point", "acquirerID":"1", "cardAcceptorID":"123456"}

@property (nonatomic, strong, readonly) NSString *merchantID;
// example: @"1"


@property (nonatomic, strong) NSNumber *language;
// ISO value for country

@property (nonatomic, strong, readonly) NSNumber *maxTransactionAmount;
// 9.999.999.999,99


/************************************ Transaction methods ************************************/

+ (void)initiatePurchaseTransactionWithInfo:(NSDictionary *)transactionInfo andDelegate:(id<MPETransactionProtocol>)delegate;
// format: {"amount":nsnumber,"currency":nsstring (iso number)}
+ (void)getListOfTransactionsWithDelegate:(id<MPETransactionProtocol>)delegate;
+ (void)initiateVoidTransactionWithInfo:(NSDictionary *)transactionInfo emailAddress:(NSString *)email andDelegate:(id<MPETransactionProtocol>)delegate;
// format: {"transactionID":int, "stan":int,"amount":double}


+ (void)authenticate;

/************************************ Device methods ************************************/

+ (BOOL)isSecureDeviceConnected;
+ (void)getSecureDeciveStatusWithDelegate:(id<MPEDeviceInfoProtocol>)delegate;
+ (void)getSecureDeciveConfigWithDelegate:(id<MPEDeviceInfoProtocol>)delegate;


+ (void)synchronizeClientServer;
// UI should implement a option to call this function which checks for new config and updates if available

+ (void)sendLogForDebugging;
// UI should implement a option to call this function which sends device logs to the server for debugging



/************************************ Testing and development methods ************************************/

@property (nonatomic) BOOL demoMode;

+ (NSString *)deviceLogs;
-  (void)clearLog;
- (void)authenticate;

@end