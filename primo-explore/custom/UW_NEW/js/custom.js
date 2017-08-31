/* Adds a polyfill for matches and closest DOM functions */
(function (ElementProto) {
   if (typeof ElementProto.matches !== 'function') {
      ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
         var element = this;
         var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
         var index = 0;

         while (elements[index] && elements[index] !== element) {
            ++index;
         }
         return Boolean(elements[index]);
      };
   }
   if (typeof ElementProto.closest !== 'function') {
      ElementProto.closest = function closest(selector) {
         var element = this;
         while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
               return element;
            }
            element = element.parentNode;
         }
         return null;
      };
   }
})(window.Element.prototype);

(function(){
"use strict";
'use strict';

/************************************* BEGIN Bootstrap Script ************************************/
/* We are a local package, so use the below line to bootstrap the module */
var app = angular.module('viewCustom', ['angularLoad']);
/************************************* END Bootstrap Script ************************************/

/* ======  Hide/Show Summit Holdings ====== */
   app.component('prmAlmaMoreInstAfter', {
      controller: 'institutionToggleController',
      templateUrl: '/primo-explore/custom/UW_NEW/html/hideShowSummit.html'
   })
   .controller('institutionToggleController', ['$scope', function($scope) {
      this.$onInit = function() {
         $scope.showLibs = false;
         $scope.button = angular.element(document.querySelector('prm-alma-more-inst-after button'));
         $scope.tabs = angular.element(document.querySelector('prm-alma-more-inst md-tabs'));
         $scope.tabs.attr('id','summitLinks');
         $scope.tabs.addClass('hide');
         $scope.button.parent().after($scope.tabs);
         
         $scope.toggleLibs = function() {
            $scope.showLibs = !$scope.showLibs;
            if ($scope.tabs.hasClass('hide')) {
               $scope.tabs.removeClass('hide');
               $scope.button.attr("aria-expanded","true");
            }
            else {
               $scope.tabs.addClass('hide');
               $scope.button.attr("aria-expanded","false");
            }
         };
      };
   }]);

   /* ====== */

   /* ====== Code for making edits to the full view ====== */
   /* Includes:
      - Alma skin fix
      - Adding local notes to any parts of the full view
        - Harvard Business Review notes
   */


   app.component('prmFullViewServiceContainerAfter', {
      bindings: {parentCtrl: '<'}, /*bind to parentCtrl to read PNX*/
      controller: 'genericSFDEController',
      templateUrl: '/primo-explore/custom/UW_NEW/html/fullPageOptionalNotes.html'
   }).controller('genericSFDEController',GenericSFDEController);
   /* ====== */
   
   var GenericSFDEController = function GenericSFDEController($scope, $element) {
      this._$scope = $scope;
      this._$elem = $element;
         
      // Local Notes Handling 
      this.localNoteOrder = ['HBR']; // place in order you want them to appear ultimately
      this.localNoteStatus = []; // associative boolean array of notes to add
      this.localNotesPresent = false;
      // End Local Notes Handling
   };
   GenericSFDEController.prototype.$onInit = function $onInit () {
      // Local Notes Handling 
      this.localNoteStatus['HBR'] = this.addHarvardBusinessReviewNote();
      // OR the localNoteStatus together
      var $localStatus = this.localNoteStatus;
      this.localNotesPresent = Object.keys(this.localNoteStatus).reduce( 
         function(run,k) { 
            return (run || $localStatus[k]);
         },
         false
      );
      // End Local Notes Handling 
   };
   GenericSFDEController.prototype.$postLink = function $postLink () {    
      var $localScope = this._$scope;
      var $localElem = this._$elem;

      // Local Notes Handling 
      var $localOrder = this.localNoteOrder;
      var $localStatus = this.localNoteStatus;      
      // Determine if we need to move some local notes before the Alma iframes
      if(this.localNotesPresent) {
         this._$scope.$watch(
            function() { 
               return $localElem.parent()[0].querySelector('prm-alma-mashup'); 
            },
            function(mashupElem, nullVal) {
               if(mashupElem !== null) {
                  // we can move the notes
                  $localOrder.reverse().forEach(
                     function(note) {
                        if($localStatus[note]) {
                           var noteClass = '.localNote' + note;
                           angular.element(mashupElem).prepend($localElem[0].querySelector(noteClass));
                        }
                     }
                  );
               }
            } 
         );
      }
      // End Local Notes Handling
   };
      
   GenericSFDEController.prototype.addHarvardBusinessReviewNote = function addHarvardBusinessReviewNote () {
      if(this.parentCtrl.index != 1) // is not the view it online tab
         { return false; }
      var issn = this.parentCtrl.item.pnx.search.issn;
      if(issn === undefined)
         { return false; }
      var hbr_regex = /^0017-?8012$/g;    
      if( Object.prototype.toString.call( issn ) === '[object Array]' ) {
         for(var i=0; i<issn.length; i++) {
            if( hbr_regex.test(String(issn[i])) )
               { return true; }
            }
         return false;    
      }
      if( typeof issn === 'string') {
         return hbr_regex.test(issn);
      }
      return false;
   };
   
   /* ====== Code for making edits to individual brief results ====== */
   /* Includes:
         - Changes PCI Ebook and Ebook chapters to display a media type of 
           Book or Book Chapter. (appears to fix this for full display too)
   */
   var GenericBriefResultController = function GenericBriefResultController($scope, $element) {
      this._$scope = $scope;
      this._$elem = $element;
   };
   GenericBriefResultController.prototype.$doCheck = function $doCheck () {
      /* run check to fix PCI ebookx */
      this.fixPCIeBookContent();
   };
   GenericBriefResultController.prototype.fixPCIeBookContent = function fixPCIeBookContent () {
      /* only run the fixes if it's PCI content (pnxID begins with TN) and
         if the content type is eBook or eBook chapter.
         To make the change permanent, we have to turn off the two attributes
         angular uses to update the value: ng-if and translate.
      */
      var pnxID = this.parentCtrl.item.pnx.control.recordid[0];
      if(pnxID.indexOf('TN') != 0)
         { return; }
      var spanElem = this._$elem.parent()[0].querySelector('div.media-content-type span');
      if(spanElem !== null && spanElem.textContent.indexOf('eBook') == 0) {
         spanElem.removeAttribute('translate');
         spanElem.removeAttribute('ng-if');
         spanElem.textContent = spanElem.textContent.replace('eBook','Book');
      }
   };
   app.component('prmBriefResultContainerAfter', {
      bindings: {parentCtrl: '<'}, /*bind to parentCtrl to read PNX*/
      controller: 'genericBriefResultController',
      templateUrl: ''
   }).controller('genericBriefResultController',GenericBriefResultController);   
   /* ====== */
   
  
   
   /* ====== Add help ====== */
   var GenericTopbarAfterController = function GenericTopbarAfterController($scope, $element) {
      this._$scope = $scope;
      this._$elem = $element;
   }; 
      
   GenericTopbarAfterController.prototype.$onInit = function $onInit () {
      this._$scope.toggleHelpModal = function() {
         var modal = document.getElementById('help-modal');
         var $modal = angular.element(modal);
         if($modal.hasClass('open')) {
            this.closeHelpModal();
         }
         else {
            this.openHelpModal();
         }
      };
      this._$scope.openHelpModal = function() {
         var button = document.getElementById('local-help-widget');
         var $button = angular.element(button);
         var modal = document.getElementById('help-modal');
         var $modal = angular.element(modal);
         /* make the modal div a block and size it to allow animation */
         $modal.addClass('open');
         angular.element(document.getElementById('help-modal-overlay')).addClass('open');
         modal.getBoundingClientRect();
         /* move the help modal and button to the left */
         $button.toggleClass('moveLeft');               
         $modal.toggleClass('moveLeft');      
         /* update the aria-expanded attribute */
         $button.attr('aria-expanded', 'true');
            
         /* set focus on first item in modal */
         document.getElementById('help-modal-close').focus();
         /* set other stuff to aria-hidden */
         document.getElementsByTagName('primo-explore')[0].setAttribute('aria-hidden', true);
         document.getElementById('beaconPlaceHolder').setAttribute('aria-hidden', true);
      };
         
      this._$scope.closeHelpModal = function() {
         var button = document.getElementById('local-help-widget');
         var $button = angular.element(button);
         var modal = document.getElementById('help-modal');
         var $modal = angular.element(modal);    
         /* move the modal and button back by removing the class */
         $modal.removeClass('moveLeft');      
         $button.removeClass('moveLeft');
         /* set the overlay to not be displayed */
         angular.element(document.getElementById('help-modal-overlay')).removeClass('open');               
         /* we have to use a timeout to set the modal to display none so the animation works
            delay is animation_time (see CSS) plus 5ms lag
         */
         setTimeout(function() { $modal.removeClass('open'); }, 305);      
         /* set other stuff to aria-hidden false */
         document.getElementsByTagName('primo-explore')[0].setAttribute('aria-hidden', false);
         document.getElementById('beaconPlaceHolder').setAttribute('aria-hidden', false);  
         /* set focus back to the modal trigger button */
         document.getElementById('local-help-button').focus();
      }
         
      this._$scope.openChatWindow = function($event) {
         $event.preventDefault();
            
         var link = document.getElementById('help-modal-chat');
         var new_href = link.getAttribute('href');
         window.open(new_href,'',"width=316,height=300");             
         return false;            
      }
         
      this._$scope.handleEscape = function($event) {
         /* close modal on escape */
         if($event.keyCode === 27) { /* escape */
            this.closeHelpModal();
         }            
      }
      this._$scope.trapFocus = function($event) {
         /* focus has to be trapped in one of three situations:
            - focus is on the help modal because someone clicked inside of it 
              Goes to close button or last link depending on tab or shift-tab
            - shift tab on the close button needs to wrap to last element
            - tab on the last link needs to wrap to the close element 
         */
         var modal = document.getElementById('help-modal');
         var close_button = document.getElementById('help-modal-close');
         var last_link = modal.querySelector('a.last-modal-link');
         if(document.activeElement === modal) {
            if($event.keyCode === 9) { // tab
               $event.preventDefault();
               if($event.shiftKey) // shift-tab
                  { last_link.focus(); }
               else 
                  { close_button.focus(); }
            }
         }
         else if(document.activeElement === close_button) {
            if($event.shiftKey && $event.keyCode === 9) { // shift-tab
               $event.preventDefault();
               last_link.focus();
            }
         }
         else if(document.activeElement === last_link) {
            if(!$event.shiftKey && $event.keyCode === 9) { /* just tab */
               $event.preventDefault();
               close_button.focus();
            }
         }
      }
   };
      
   GenericTopbarAfterController.prototype.$postLink = function $postLink () {
      document.body.append(document.getElementById('help-modal'));
      document.body.append(document.getElementById('help-modal-overlay'));
   };
   app.component('prmTopbarAfter', {
      controller: 'genericTopbarAfterController',
      templateUrl: '/primo-explore/custom/UW_NEW/html/topbarAfter.html'
   }).controller('genericTopbarAfterController',GenericTopbarAfterController);   
   /* ====== */


   /* ====== Add Update Personal Information to Personal Details Page ====== */
   app.component('prmPersonalInfoAfter', {
      controller: 'personalInfoController',
      templateUrl: '/primo-explore/custom/UW_NEW/html/personalDetails.html'
   })
   .controller('personalInfoController', ['$scope', function($scope) {
      this.$onInit = function() {
         angular.element(document.getElementById('personalDetails').querySelector('md-card-content')).append(document.getElementById('local-personal-info-change'));
      };
   }]);  
   /* ====== */
   
    /* ====== Load Alerts ===== */
   app.component('prmTopBarBefore', {
      templateUrl: '/primo-explore/custom/UW_NEW/html/local-menu.html',
      controller: 'localMenuAlertsController',
   }).controller('localMenuAlertsController', ['$scope', 'angularLoad', function($scope,angularLoad) {
         this.isLoggedIn = function() {
            return (this.userName() !== null && this.userName().length > 0);
         }
         
         this.userName = function() {
            return "Kate";
            try {
               var rootScope = $scope.$root;
               var uSMS = rootScope.$$childHead.$ctrl.userSessionManagerService;
               var jwtData = uSMS.jwtUtilService.getDecodedToken();
               return jwtData.userName;
            }
            catch(e) {
               return null;
            }
         }
         
         this.$postLink = function() {
            /* we use an if to only do it once. Otherwise, alert repetition can occur */
            if(!document.getElementById('libAlerts-outer')) {
               /* first create a space within primo-explore for the UW Library alerts to live */
               angular.element(document.getElementsByTagName('primo-explore')[0]).prepend('<div id="libAlerts-outer" class="hide"><div id="libAlerts"></div></div>');
               /* load the general UW library alerts JS. Once loaded (then) display the alerts if any */
               angularLoad.loadScript('https://www.lib.washington.edu/scripts/libalert.js').then(function() {
                  displayLibAlert();
                  if(document.querySelector('#libAlerts .alert') != null)
                     angular.element(document.getElementById('libAlerts-outer')).removeClass('hide');                  
               });
               /* load the general Primo library alerts JS. Once loaded (then) display the alerts if any */
               angularLoad.loadScript('https://www.lib.washington.edu/static/public/primo/primo-alerts.js').then(function() {
                  displayPrimoLibAlert(); 
                  if(document.querySelector('#libAlerts .alert') != null)
                     angular.element(document.getElementById('libAlerts-outer')).removeClass('hide');                      
               });;            
            }
            /* we do UW-wide alerts after so that they appear on top */
            if(!document.getElementById('uwalert-alert-message')) {
               /* load the UW alerts script and then some magick to make sure it doesn't mess with 
                  Primo's modal placement calculations */
               angularLoad.loadScript('https://www.washington.edu/static/alert.js').then(function() {
                  /* once the script is loaded, try to move the alert's div */
                  angular.element(document.getElementsByTagName('primo-explore')[0]).prepend(document.getElementById('uwalert-alert-message'));
                  /* just in case, we proxy the UW alert's addElement function to always place the UW alert at the 
                     start of primo-explore */
                  var org_addElement = window.addElement;
                  window.addElement = function() {
                     org_addElement.apply(this,arguments);
                     angular.element(document.getElementsByTagName('primo-explore')[0]).prepend(document.getElementById('uwalert-alert-message'));
                  };
               });
            }
        };
      }
   ]);
   /* ====== */
   
   var MainMenuAfterController = function MainMenuAfterController($scope, $element) {
      $scope.$element = $element;
      
      this.parentCtrl.showCount = function() { 
         var mainMenu = $scope.$element[0].closest('prm-main-menu');
         if(mainMenu === null)
            return 10; 
         else if(mainMenu.getAttribute('local-menu-type') == 'more')
            return 1;
         else if(mainMenu.getAttribute('local-menu-type') == 'menu')
            return 10;
         else
            return 10;
      }
   };
   app.component('prmMainMenuAfter', {
      bindings: {parentCtrl: '<'},
      controller: 'MainMenuAfterController'
   })
   .controller('MainMenuAfterController', MainMenuAfterController);
   
})();