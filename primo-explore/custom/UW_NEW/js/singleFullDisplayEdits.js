let app = angular.module('singleFullDisplayEdits',[]);
export default app;

class GenericSFDEController {
   constructor($scope, $element) {
      this._$scope = $scope;
      this._$elem = $element;
      
      // Local Notes Handling 
      this.localNoteOrder = ['HBR']; // place in order you want them to appear ultimately
      this.localNoteStatus = []; // associative boolean array of notes to add
      this.localNotesPresent = false;
      // End Local Notes Handling
   }
   $onInit() {
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
   }
   $postLink() {    
      var $localScope = this._$scope;
      var $localElem = this._$elem;
      
      // IFrame Fixing
      this._$scope.$watch(
         function() { 
            return $localElem.parent()[0].querySelector('iframe'); 
         },
         function(iframe, nullVal) {
            if(iframe !== null) {
               var OLD_SKIN = 'uw_sandbox_skin';
               var NEW_SKIN = 'uw_new_sandbox_skin';
               var src = iframe.getAttributeNode('src').value;        
               if( src.indexOf('req.skin='+OLD_SKIN) != -1 ) {               
                  src = src.replace('req.skin='+OLD_SKIN, 'req.skin='+NEW_SKIN);
                  iframe.getAttributeNode('src').value = src;
               }  
            }
         }
      );
      
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
   }
   
   addHarvardBusinessReviewNote() {
      if(this.parentCtrl.index != 1) // is not the view it online tab
         return false;
      var issn = this.parentCtrl.item.pnx.search.issn;
      if(issn === undefined)
         return false;
      var hbr_regex = /^0017-?8012$/g;    
      if( Object.prototype.toString.call( issn ) === '[object Array]' ) {
         for(var i=0; i<issn.length; i++) {
            if( hbr_regex.test(String(issn[i])) )
               return true;
            }
         return false;    
      }
      if( typeof issn === 'string') {
         return hbr_regex.test(issn);
      }
      return false;
   };  
}

app.component('prmFullViewServiceContainerAfter', {
    bindings: {parentCtrl: '<'}, /*bind to parentCtrl to read PNX*/
    controller: 'genericSFDEController',
    templateUrl: '/primo-explore/custom/UW_NEW/html/fullPageOptionalNotes.html'
}).controller('genericSFDEController',GenericSFDEController)

