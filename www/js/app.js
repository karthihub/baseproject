'use strict'
/**
 *	Default Language Message strings 
 */
var Messages = {
    // key1 : message1,
};
var permissions;
var pushTokenReceived;
/**
 * Angular module to bootstrap the angular application
 */
var MeethaqApp = {};

/**
 * Meta data of Meethaq Mobile Application
 */
var APP_DATA = {};

/**
 * Common object to used for initialize and bootstrap
 */
var app = {

    /**
     * Initializing the Application components
     */
    initializeApp: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
	/**
     * Device is ready to launch the application
     */
	onDeviceReady: function() {
		APP_DATA.COMMON = {};

		//Set to false when App release to Production
        APP_DATA.COMMON.isLogEnabled = true;
		setTimeout(function(){
            app.detectDeviceEnvironment();
            app.addIonicPlatformClass();
            app.bootstrapAngular();	
		}, 3000);

        // var listener = window.broadcaster.addEventListener( "pushToken", function( e ) {
        //         //log: didShow received! userInfo: {"data":"test"}
        //         console.log( "didShow received! userInfo: " + JSON.stringify(e)  );
        //         pushTokenReceived(e.data);
        // });
    },
	
    /**
     * Capture the Device runtime platform
     */
    detectDeviceEnvironment: function() {
        APP_DATA.COMMON.DevicePlatform = device.platform;
        permissions = cordova.plugins.permissions;

        

    },

    /**
     * Add the Ionic CSS Class to body to render the Device specific look and feel 
     */
    addIonicPlatformClass: function() {
        if (APP_DATA.COMMON.DevicePlatform === "iphone" ||
            APP_DATA.COMMON.DevicePlatform === "ipad") {
            document.body.classList.add('platform-ios');
        } else if (APP_DATA.COMMON.DevicePlatform === "Android") {
            document.body.classList.add('platform-android');
        }
    },
    /**
     *  Bootstrapping the AngularJS and Ionic framework
     */
    bootstrapAngular: function() {

        /* Initializing Meethaq Angular JS */
        baseAPP = angular.module('App', ['ionic', 'ionic-material']);

        baseAPP.run(function($ionicPlatform, $rootScope) {
            $ionicPlatform.ready(function() {
            	$rootScope.NFCListenerEnable = true;
                if (window.cordova && window.cordova.plugins.Keyboard) {

                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

                    // Don't remove this line unless you know what you are doing. It stops the viewport
                    // from snapping when text inputs are focused. Ionic handles this internally for
                    // a much nicer keyboard experience.
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        });

		/**
		* Meethaq Angular Application Services, factories and providers are configured.
		*/
        
         

		/**
		* requireJS file configuration before the loading the Script fileSize
		*/
        requirejs.config({
            baseUrl: 'js/'
        });

		/**
		* List of the script file location strings for lazy loading.
		*/
        var requireJsFiles = [
          /* Base App Contollers init */
          'controllers/mainCtrl',

          //* Loading multi language strings */
            'storage/strings'
            
        ];
		
		/**
		* Lazy loading of the Javascript files using requireJS.
		*/
        require(requireJsFiles, function() {
			angular.bootstrap(document, ['App']);
        });
    }
};

app.initializeApp();

