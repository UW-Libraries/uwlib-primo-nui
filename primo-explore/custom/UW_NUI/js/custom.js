(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var app = angular.module('hideShowSummit', []);
exports.default = app;

/* Hide/Show Other Institutions Button */

app.component('prmAlmaMoreInstAfter', {
   controller: 'institutionToggleController',
   template: '<md-button class="md-raised" ng-click="toggleLibs()" id="summitButton"\n               aria-controls="summitLinks" aria-expanded="false"\n               aria-label="Show/Hide Summit Libraries">\n               {{ showLibs ? \'Hide Libraries\' : \'Show Libraries\' }}\n               <span aria-hidden="true">{{showLibs ? \'&laquo;\' : \'&raquo;\' }}</span>\n              </md-button>'
}).controller('institutionToggleController', ['$scope', function ($scope) {
   this.$onInit = function () {
      $scope.showLibs = false;
      $scope.button = angular.element(document.querySelector('prm-alma-more-inst-after button'));
      $scope.tabs = angular.element(document.querySelector('prm-alma-more-inst md-tabs'));
      $scope.tabs.attr('id', 'summitLinks');
      $scope.tabs.addClass('hide');
      $scope.button.parent().after($scope.tabs);

      $scope.toggleLibs = function () {
         $scope.showLibs = !$scope.showLibs;
         if ($scope.tabs.hasClass('hide')) {
            $scope.tabs.removeClass('hide');
            $scope.button.attr("aria-expanded", "true");
         } else {
            $scope.tabs.addClass('hide');
            $scope.button.attr("aria-expanded", "false");
         }
      };
   };
}]);

},{}],2:[function(require,module,exports){
'use strict';

var _hideShowSummit = require('./hideShowSummit');

var _hideShowSummit2 = _interopRequireDefault(_hideShowSummit);

var _singleFullDisplayEdits = require('./singleFullDisplayEdits');

var _singleFullDisplayEdits2 = _interopRequireDefault(_singleFullDisplayEdits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('viewCustom', ['angularLoad', _hideShowSummit2.default.name, _singleFullDisplayEdits2.default.name]);

},{"./hideShowSummit":1,"./singleFullDisplayEdits":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('singleFullDisplayEdits', []);
exports.default = app;

var GenericSFDEController = function () {
   function GenericSFDEController($scope, $element) {
      _classCallCheck(this, GenericSFDEController);

      this._$scope = $scope;
      this._$elem = $element;

      // Local Notes Handling 
      this.localNoteOrder = ['HBR']; // place in order you want them to appear ultimately
      this.localNoteStatus = []; // associative boolean array of notes to add
      this.localNotesPresent = false;
      // End Local Notes Handling
   }

   _createClass(GenericSFDEController, [{
      key: '$onInit',
      value: function $onInit() {
         // Local Notes Handling 
         this.localNoteStatus['HBR'] = this.addHarvardBusinessReviewNote();
         // OR the localNoteStatus together
         var $localStatus = this.localNoteStatus;
         this.localNotesPresent = Object.keys(this.localNoteStatus).reduce(function (run, k) {
            return run || $localStatus[k];
         }, false);
         // End Local Notes Handling 
      }
   }, {
      key: '$postLink',
      value: function $postLink() {
         var $localScope = this._$scope;
         var $localElem = this._$elem;

         // IFrame Fixing
         this._$scope.$watch(function () {
            return $localElem.parent()[0].querySelector('iframe');
         }, function (iframe, nullVal) {
            if (iframe !== null) {
               var OLD_SKIN = 'uw_production_summit3_skin';
               var NEW_SKIN = 'uw_new_production_skin';
               var src = iframe.getAttributeNode('src').value;
               if (src.indexOf('req.skin=' + OLD_SKIN) != -1) {
                  src = src.replace('req.skin=' + OLD_SKIN, 'req.skin=' + NEW_SKIN);
                  iframe.getAttributeNode('src').value = src;
               }
            }
         });

         // Local Notes Handling 
         var $localOrder = this.localNoteOrder;
         var $localStatus = this.localNoteStatus;
         // Determine if we need to move some local notes before the Alma iframes
         if (this.localNotesPresent) {
            this._$scope.$watch(function () {
               return $localElem.parent()[0].querySelector('prm-alma-mashup');
            }, function (mashupElem, nullVal) {
               if (mashupElem !== null) {
                  // we can move the notes
                  $localOrder.reverse().forEach(function (note) {
                     if ($localStatus[note]) {
                        var noteClass = '.localNote' + note;
                        angular.element(mashupElem).prepend($localElem[0].querySelector(noteClass));
                     }
                  });
               }
            });
         }
         // End Local Notes Handling
      }
   }, {
      key: 'addHarvardBusinessReviewNote',
      value: function addHarvardBusinessReviewNote() {
         if (this.parentCtrl.index != 1) // is not the view it online tab
            return false;
         var issn = this.parentCtrl.item.pnx.search.issn;
         if (issn === undefined) return false;
         var hbr_regex = /^0017-?8012$/g;
         if (Object.prototype.toString.call(issn) === '[object Array]') {
            for (var i = 0; i < issn.length; i++) {
               if (hbr_regex.test(String(issn[i]))) return true;
            }
            return false;
         }
         if (typeof issn === 'string') {
            return hbr_regex.test(issn);
         }
         return false;
      }
   }]);

   return GenericSFDEController;
}();

app.component('prmFullViewServiceContainerAfter', {
   bindings: { parentCtrl: '<' }, /*bind to parentCtrl to read PNX*/
   controller: 'genericSFDEController',
   templateUrl: '/primo-explore/custom/UW_NUI/html/fullPageOptionalNotes.html'
}).controller('genericSFDEController', GenericSFDEController);

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlXFxjdXN0b21cXFVXX05VSVxcanNcXGhpZGVTaG93U3VtbWl0LmpzIiwicHJpbW8tZXhwbG9yZVxcY3VzdG9tXFxVV19OVUlcXGpzXFxtYWluLmpzIiwicHJpbW8tZXhwbG9yZVxcY3VzdG9tXFxVV19OVUlcXGpzXFxzaW5nbGVGdWxsRGlzcGxheUVkaXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxJQUFJLE1BQU0sUUFBUSxNQUFSLENBQWUsZ0JBQWYsRUFBZ0MsRUFBaEMsQ0FBVjtrQkFDZSxHOztBQUVmOztBQUNBLElBQUksU0FBSixDQUFjLHNCQUFkLEVBQXNDO0FBQ25DLGVBQVksNkJBRHVCO0FBRW5DO0FBRm1DLENBQXRDLEVBU0MsVUFURCxDQVNZLDZCQVRaLEVBUzJDLENBQUMsUUFBRCxFQUFXLFVBQVMsTUFBVCxFQUFpQjtBQUNwRSxRQUFLLE9BQUwsR0FBZSxZQUFXO0FBQ3ZCLGFBQU8sUUFBUCxHQUFrQixLQUFsQjtBQUNBLGFBQU8sTUFBUCxHQUFnQixRQUFRLE9BQVIsQ0FBZ0IsU0FBUyxhQUFULENBQXVCLGlDQUF2QixDQUFoQixDQUFoQjtBQUNBLGFBQU8sSUFBUCxHQUFjLFFBQVEsT0FBUixDQUFnQixTQUFTLGFBQVQsQ0FBdUIsNEJBQXZCLENBQWhCLENBQWQ7QUFDQSxhQUFPLElBQVAsQ0FBWSxJQUFaLENBQWlCLElBQWpCLEVBQXNCLGFBQXRCO0FBQ0EsYUFBTyxJQUFQLENBQVksUUFBWixDQUFxQixNQUFyQjtBQUNBLGFBQU8sTUFBUCxDQUFjLE1BQWQsR0FBdUIsS0FBdkIsQ0FBNkIsT0FBTyxJQUFwQzs7QUFHQSxhQUFPLFVBQVAsR0FBb0IsWUFBVztBQUM1QixnQkFBTyxRQUFQLEdBQWtCLENBQUMsT0FBTyxRQUExQjtBQUNBLGFBQUksT0FBTyxJQUFQLENBQVksUUFBWixDQUFxQixNQUFyQixD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dXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdoaWRlU2hvd1N1bW1pdCcsW10pO1xuZXhwb3J0IGRlZmF1bHQgYXBwO1xuXG4vKiBIaWRlL1Nob3cgT3RoZXIgSW5zdGl0dXRpb25zIEJ1dHRvbiAqL1xuYXBwLmNvbXBvbmVudCgncHJtQWxtYU1vcmVJbnN0QWZ0ZXInLCB7XG4gICBjb250cm9sbGVyOiAnaW5zdGl0dXRpb25Ub2dnbGVDb250cm9sbGVyJyxcbiAgIHRlbXBsYXRlOiBgPG1kLWJ1dHRvbiBjbGFzcz1cIm1kLXJhaXNlZFwiIG5nLWNsaWNrPVwidG9nZ2xlTGlicygpXCIgaWQ9XCJzdW1taXRCdXR0b25cIlxuICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz1cInN1bW1pdExpbmtzXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTaG93L0hpZGUgU3VtbWl0IExpYnJhcmllc1wiPlxuICAgICAgICAgICAgICAge3sgc2hvd0xpYnMgPyAnSGlkZSBMaWJyYXJpZXMnIDogJ1Nob3cgTGlicmFyaWVzJyB9fVxuICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3tzaG93TGlicyA/ICcmbGFxdW87JyA6ICcmcmFxdW87JyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9tZC1idXR0b24+YFxufSlcbi5jb250cm9sbGVyKCdpbnN0aXR1dGlvblRvZ2dsZUNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuc2hvd0xpYnMgPSBmYWxzZTtcbiAgICAgICRzY29wZS5idXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncHJtLWFsbWEtbW9yZS1pbnN0LWFmdGVyIGJ1dHRvbicpKTtcbiAgICAgICRzY29wZS50YWJzID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BybS1hbG1hLW1vcmUtaW5zdCBtZC10YWJzJykpO1xuICAgICAgJHNjb3BlLnRhYnMuYXR0cignaWQnLCdzdW1taXRMaW5rcycpO1xuICAgICAgJHNjb3BlLnRhYnMuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICRzY29wZS5idXR0b24ucGFyZW50KCkuYWZ0ZXIoJHNjb3BlLnRhYnMpO1xuICAgICAgXG4gICAgICBcbiAgICAgICRzY29wZS50b2dnbGVMaWJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAkc2NvcGUuc2hvd0xpYnMgPSAhJHNjb3BlLnNob3dMaWJzO1xuICAgICAgICAgaWYgKCRzY29wZS50YWJzLmhhc0NsYXNzKCdoaWRlJykpIHtcbiAgICAgICAgICAgICRzY29wZS50YWJzLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICAkc2NvcGUuYnV0dG9uLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsXCJ0cnVlXCIpO1xuICAgICAgICAgfVxuICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUudGFicy5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgJHNjb3BlLmJ1dHRvbi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLFwiZmFsc2VcIik7XG4gICAgICAgICB9XG4gICAgICB9O1xuICAgfTtcbn1dKTsiLCJpbXBvcnQgc3VtbWl0VGFicyBmcm9tICcuL2hpZGVTaG93U3VtbWl0JztcclxuaW1wb3J0IHNGREUgZnJvbSAnLi9zaW5nbGVGdWxsRGlzcGxheUVkaXRzJztcclxuXHJcbmxldCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndmlld0N1c3RvbScsWydhbmd1bGFyTG9hZCcsIHN1bW1pdFRhYnMubmFtZSwgc0ZERS5uYW1lXSk7XHJcblxyXG5cclxuIiwibGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdzaW5nbGVGdWxsRGlzcGxheUVkaXRzJyxbXSk7XG5leHBvcnQgZGVmYXVsdCBhcHA7XG5cbmNsYXNzIEdlbmVyaWNTRkRFQ29udHJvbGxlciB7XG4gICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICB0aGlzLl8kc2NvcGUgPSAkc2NvcGU7XG4gICAgICB0aGlzLl8kZWxlbSA9ICRlbGVtZW50O1xuICAgICAgXG4gICAgICAvLyBMb2NhbCBOb3RlcyBIYW5kbGluZyBcbiAgICAgIHRoaXMubG9jYWxOb3RlT3JkZXIgPSBbJ0hCUiddOyAvLyBwbGFjZSBpbiBvcmRlciB5b3Ugd2FudCB0aGVtIHRvIGFwcGVhciB1bHRpbWF0ZWx5XG4gICAgICB0aGlzLmxvY2FsTm90ZVN0YXR1cyA9IFtdOyAvLyBhc3NvY2lhdGl2ZSBib29sZWFuIGFycmF5IG9mIG5vdGVzIHRvIGFkZFxuICAgICAgdGhpcy5sb2NhbE5vdGVzUHJlc2VudCA9IGZhbHNlO1xuICAgICAgLy8gRW5kIExvY2FsIE5vdGVzIEhhbmRsaW5nXG4gICB9XG4gICAkb25Jbml0KCkge1xuICAgICAgLy8gTG9jYWwgTm90ZXMgSGFuZGxpbmcgXG4gICAgICB0aGlzLmxvY2FsTm90ZVN0YXR1c1snSEJSJ10gPSB0aGlzLmFkZEhhcnZhcmRCdXNpbmVzc1Jldmlld05vdGUoKTtcbiAgICAgIC8vIE9SIHRoZSBsb2NhbE5vdGVTdGF0dXMgdG9nZXRoZXJcbiAgICAgIHZhciAkbG9jYWxTdGF0dXMgPSB0aGlzLmxvY2FsTm90ZVN0YXR1cztcbiAgICAgIHRoaXMubG9jYWxOb3Rlc1ByZXNlbnQgPSBPYmplY3Qua2V5cyh0aGlzLmxvY2FsTm90ZVN0YXR1cykucmVkdWNlKCBcbiAgICAgICAgIGZ1bmN0aW9uKHJ1bixrKSB7IFxuICAgICAgICAgICAgcmV0dXJuIChydW4gfHwgJGxvY2FsU3RhdHVzW2tdKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICAgIC8vIEVuZCBMb2NhbCBOb3RlcyBIYW5kbGluZyBcbiAgIH1cbiAgICRwb3N0TGluaygpIHsgICAgXG4gICAgICB2YXIgJGxvY2FsU2NvcGUgPSB0aGlzLl8kc2NvcGU7XG4gICAgICB2YXIgJGxvY2FsRWxlbSA9IHRoaXMuXyRlbGVtO1xuICAgICAgXG4gICAgICAvLyBJRnJhbWUgRml4aW5nXG4gICAgICB0aGlzLl8kc2NvcGUuJHdhdGNoKFxuICAgICAgICAgZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgcmV0dXJuICRsb2NhbEVsZW0ucGFyZW50KClbMF0ucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7IFxuICAgICAgICAgfSxcbiAgICAgICAgIGZ1bmN0aW9uKGlmcmFtZSwgbnVsbFZhbCkge1xuICAgICAgICAgICAgaWYoaWZyYW1lICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICB2YXIgT0xEX1NLSU4gPSAndXdfcHJvZHVjdGlvbl9zdW1taXQzX3NraW4nO1xuICAgICAgICAgICAgICAgdmFyIE5FV19TS0lOID0gJ3V3X25ld19wcm9kdWN0aW9uX3NraW4nO1xuICAgICAgICAgICAgICAgdmFyIHNyYyA9IGlmcmFtZS5nZXRBdHRyaWJ1dGVOb2RlKCdzcmMnKS52YWx1ZTsgICAgICAgIFxuICAgICAgICAgICAgICAgaWYoIHNyYy5pbmRleE9mKCdyZXEuc2tpbj0nK09MRF9TS0lOKSAhPSAtMSApIHsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKCdyZXEuc2tpbj0nK09MRF9TS0lOLCAncmVxLnNraW49JytORVdfU0tJTik7XG4gICAgICAgICAgICAgICAgICBpZnJhbWUuZ2V0QXR0cmlidXRlTm9kZSgnc3JjJykudmFsdWUgPSBzcmM7XG4gICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICk7XG4gICAgICBcbiAgICAgIC8vIExvY2FsIE5vdGVzIEhhbmRsaW5nIFxuICAgICAgdmFyICRsb2NhbE9yZGVyID0gdGhpcy5sb2NhbE5vdGVPcmRlcjtcbiAgICAgIHZhciAkbG9jYWxTdGF0dXMgPSB0aGlzLmxvY2FsTm90ZVN0YXR1czsgICAgICBcbiAgICAgIC8vIERldGVybWluZSBpZiB3ZSBuZWVkIHRvIG1vdmUgc29tZSBsb2NhbCBub3RlcyBiZWZvcmUgdGhlIEFsbWEgaWZyYW1lc1xuICAgICAgaWYodGhpcy5sb2NhbE5vdGVzUHJlc2VudCkge1xuICAgICAgICAgdGhpcy5fJHNjb3BlLiR3YXRjaChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgIHJldHVybiAkbG9jYWxFbGVtLnBhcmVudCgpWzBdLnF1ZXJ5U2VsZWN0b3IoJ3BybS1hbG1hLW1hc2h1cCcpOyBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihtYXNodXBFbGVtLCBudWxsVmFsKSB7XG4gICAgICAgICAgICAgICBpZihtYXNodXBFbGVtICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAvLyB3ZSBjYW4gbW92ZSB0aGUgbm90ZXNcbiAgICAgICAgICAgICAgICAgICRsb2NhbE9yZGVyLnJldmVyc2UoKS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24obm90ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJGxvY2FsU3RhdHVzW25vdGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm90ZUNsYXNzID0gJy5sb2NhbE5vdGUnICsgbm90ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChtYXNodXBFbGVtKS5wcmVwZW5kKCRsb2NhbEVsZW1bMF0ucXVlcnlTZWxlY3Rvcihub3RlQ2xhc3MpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuICAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIEVuZCBMb2NhbCBOb3RlcyBIYW5kbGluZ1xuICAgfVxuICAgXG4gICBhZGRIYXJ2YXJkQnVzaW5lc3NSZXZpZXdOb3RlKCkge1xuICAgICAgaWYodGhpcy5wYXJlbnRDdHJsLmluZGV4ICE9IDEpIC8vIGlzIG5vdCB0aGUgdmlldyBpdCBvbmxpbmUgdGFiXG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB2YXIgaXNzbiA9IHRoaXMucGFyZW50Q3RybC5pdGVtLnBueC5zZWFyY2guaXNzbjtcbiAgICAgIGlmKGlzc24gPT09IHVuZGVmaW5lZClcbiAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBoYnJfcmVnZXggPSAvXjAwMTctPzgwMTIkL2c7ICAgIFxuICAgICAgaWYoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggaXNzbiApID09PSAnW29iamVjdCBBcnJheV0nICkge1xuICAgICAgICAgZm9yKHZhciBpPTA7IGk8aXNzbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoIGhicl9yZWdleC50ZXN0KFN0cmluZyhpc3NuW2ldKSkgKVxuICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICByZXR1cm4gZmFsc2U7ICAgIFxuICAgICAgfVxuICAgICAgaWYoIHR5cGVvZiBpc3NuID09PSAnc3RyaW5nJykge1xuICAgICAgICAgcmV0dXJuIGhicl9yZWdleC50ZXN0KGlzc24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgfTsgIFxufVxuXG5hcHAuY29tcG9uZW50KCdwcm1GdWxsVmlld1NlcnZpY2VDb250YWluZXJBZnRlcicsIHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sIC8qYmluZCB0byBwYXJlbnRDdHJsIHRvIHJlYWQgUE5YKi9cbiAgICBjb250cm9sbGVyOiAnZ2VuZXJpY1NGREVDb250cm9sbGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy9wcmltby1leHBsb3JlL2N1c3RvbS9VV19OVUkvaHRtbC9mdWxsUGFnZU9wdGlvbmFsTm90ZXMuaHRtbCdcbn0pLmNvbnRyb2xsZXIoJ2dlbmVyaWNTRkRFQ29udHJvbGxlcicsR2VuZXJpY1NGREVDb250cm9sbGVyKVxuXG4iXX0=
