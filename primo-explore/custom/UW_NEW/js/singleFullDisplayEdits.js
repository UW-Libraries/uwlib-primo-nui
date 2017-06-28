let app = angular.module('singleFullDisplayEdits',[]);
export default app;

class GenericSFDEController {
    constructor($scope, $element) {
        this._$scope = $scope;
        this._$elem = $element;
        this.moveNoteHBR = false;
        this.almaMashups = $element.parent()[0].querySelector('iframe');
    }
    $onInit() {
        this.moveNoteHBR = this.isHarvardBusinessReviewItem();
        console.log(this._$elem.parent()[0]);
        console.log(this.parentCtrl);
        console.log(this.parentCtrl.isAlmaGetit() === false)
    }
    $postLink() {
        
        
        console.log('POSTLINK');
        if(this.moveNoteHBR) {
            this._$scope.$watch('$ctrl.almaMashups', function() { console.log('MASH'); } );
            // templateUrl: '/primo-explore/custom/UW_NEW/html/fullPageOptionalNotes.html'
            //moveNote('localNoteHBR');

        }
    }
    
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
    
    
    moveNote(noteID) {
        console.log('MOVE');
        var note = this._$elem[0].querySelector('#'+noteID);
        console.log(note);
        this.almaMashups[0].prepend(note);
        
    }
    isHarvardBusinessReviewItem() {
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
    controller: 'genericSFDEController'
}).controller('genericSFDEController',GenericSFDEController)

