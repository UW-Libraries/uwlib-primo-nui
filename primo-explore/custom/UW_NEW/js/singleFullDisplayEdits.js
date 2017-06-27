let app = angular.module('singleFullDisplayEdits',[]);
export default app;

app.component('prmFullViewAfter', {
   bindings: {parentCtrl: '<'}, /*bind to parentCtrl to read PNX*/
   controller: 'genericSFDEController',
   templateUrl: '/primo-explore/custom/UW_NEW/html/fullPageOptionalNotes.html'
})
.controller('genericSFDEController', ['$scope', function($scope) {
   var vm = this;
   this.$onInit = function() {
      
      var issn = vm.parentCtrl.item.pnx.search.issn;
      if( $scope.isHarvardBusinessReviewItem(issn) ) {
         var hbr_note = angular.element( document.getElementById('localNoteHBR') );
         var first_iframe = document.getElementsByTagName('iframe')[0];
         console.log(document.getElementsByTagName('iframe'));
         console.log('HERE');
         if(first_iframe !== undefined) {
            angular.element(first_iframe).parent().prepend(hbr_note);
         }
      }
   };
   
   $scope.isHarvardBusinessReviewItem = function(issn) {
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
   
   $scope.addHarvardBusinessReviewNotice = function() {
      //var viewIt = angular.element( document.querySelector('prm-full-view-after') );
      
      //var notice = angular.element("<p>To access the full-text of Harvard Business Review articles, you must search for the article title at the <a>journal's homepage</a>.</p>");
      //console.log(viewIt);
      //viewIt.append(notice);
      
   };
   
   
}]);