let app = angular.module('singleFullDisplayEdits',[]);
export default app;

class GenericSFDEController {
    constructor($scope, $element) {
        this._$scope = $scope;
        this._$elem = $element;
        this.addNoteHBR = false;
        //this._$scope.almaMashups = this._$elem.parent()[0].querySelector('iframe');
    }
    $onInit() {
        this.addNoteHBR = this.isHarvardBusinessReviewItem();
    }
    $postLink() {
        
        var elem = this._$elem;
        console.log('POSTLINK');
        if(this.addNoteHBR) {
            this._$scope.$watch(
               function() { return elem.parent()[0].querySelector('prm-alma-mashup'); },
               function(mashupElem, nullVal) {
                  if(mashupElem !== null) {
                     // we can move the note
                     angular.element(mashupElem).prepend(document.getElementById('localNoteHBR'));
                  }
               
               } 
            );


        }
    }
    

    
    
    moveNote(noteID) {
        console.log('MOVE');
        var note = this._$elem[0].querySelector('#'+noteID);
        console.log(note);
        this.almaMashups[0].prepend(note);
        
    }
    isHarvardBusinessReviewItem() {
      if(this.parentCtrl.index != 1) // is not the view it online tab
         return;
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
   
    fixAlmaSkin() {
        var OLD_SKIN = 'uw_sandbox_skin';
        var NEW_SKIN = 'uw_new_sandbox_skin';
        
        
        var iframe = this._$elem.parent()[0].querySelector('iframe');
        console.log(iframe);
        if(iframe === undefined || iframe === null)
            return;
        console.log('iframe found');
        var src = iframe.getAttributeNode('src').value;        
        if( src.indexOf('req.skin='+OLD_SKIN) != -1 ) {               
            src = src.replace('req.skin='+OLD_SKIN, 'req.skin='+NEW_SKIN);
            iframe.getAttributeNode('src').value = src;
            iframe.getAttributeNode('ng-src').value = src;
        }        

    }
}

app.component('prmFullViewServiceContainerAfter', {
    bindings: {parentCtrl: '<'}, /*bind to parentCtrl to read PNX*/
    controller: 'genericSFDEController',
    templateUrl: '/primo-explore/custom/UW_NEW/html/fullPageOptionalNotes.html'
}).controller('genericSFDEController',GenericSFDEController)

