(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = angular.module('changeAlmaSkin', []);
exports.default = app;


app.directive('prmFullViewServiceContainerAfter', function () {
    var controller = ['$scope', function ($scope) {

        $scope.fixSkin = function () {
            var OLD_SKIN = 'uw_sandbox_skin';
            var NEW_SKIN = 'uw_new_sandbox_skin';

            var section = document.getElementById($scope.parentid);
            if (section === undefined || section === null) return;
            var iframes = section.getElementsByClassName('mashup-iframe');
            for (var i = 0, len = iframes.length; i < len; i++) {
                var src = iframes[i].getAttributeNode('src').value;
                if (src.indexOf('req.skin=' + OLD_SKIN) != -1) {
                    src = src.replace('req.skin=' + OLD_SKIN, 'req.skin=' + NEW_SKIN);
                    iframes[i].getAttributeNode('src').value = src;
                }
            }
        };
    }];

    var template = '{{fixSkin()}}';

    return {
        scope: { parentid: '@' },
        link: function link(scope, element, attrs) {
            var id = element.parent().parent().parent().attr('id');
            scope.parentid = id;
        },
        controller: controller,
        template: template
    };
});

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var _changeAlmaSkin = require('./changeAlmaSkin');

var _changeAlmaSkin2 = _interopRequireDefault(_changeAlmaSkin);

var _hideShowSummit = require('./hideShowSummit');

var _hideShowSummit2 = _interopRequireDefault(_hideShowSummit);

var _singleFullDisplayEdits = require('./singleFullDisplayEdits');

var _singleFullDisplayEdits2 = _interopRequireDefault(_singleFullDisplayEdits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('viewCustom', ['angularLoad', _hideShowSummit2.default.name, _changeAlmaSkin2.default.name, _singleFullDisplayEdits2.default.name]);

},{"./changeAlmaSkin":1,"./hideShowSummit":2,"./singleFullDisplayEdits":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var app = angular.module('singleFullDisplayEdits', []);
exports.default = app;


app.component('prmFullViewAfter', {
   bindings: { parentCtrl: '<' }, /*bind to parentCtrl to read PNX*/
   controller: 'genericSFDEController',
   templateUrl: '/primo-explore/custom/UW_NEW/html/fullPageOptionalNotes.html'
}).controller('genericSFDEController', ['$scope', function ($scope) {
   var vm = this;
   this.$onInit = function () {

      var issn = vm.parentCtrl.item.pnx.search.issn;
      if ($scope.isHarvardBusinessReviewItem(issn)) {
         var hbr_note = angular.element(document.getElementById('localNoteHBR'));
         var first_iframe = document.getElementsByTagName('iframe')[0];
         console.log(document.getElementsByTagName('iframe'));
         console.log('HERE');
         if (first_iframe !== undefined) {
            angular.element(first_iframe).parent().prepend(hbr_note);
         }
      }
   };

   $scope.isHarvardBusinessReviewItem = function (issn) {
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
   };

   $scope.addHarvardBusinessReviewNotice = function () {
      //var viewIt = angular.element( document.querySelector('prm-full-view-after') );

      //var notice = angular.element("<p>To access the full-text of Harvard Business Review articles, you must search for the article title at the <a>journal's homepage</a>.</p>");
      //console.log(viewIt);
      //viewIt.append(notice);

   };
}]);

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlXFxjdXN0b21cXFVXX05FV1xcanNcXGNoYW5nZUFsbWFTa2luLmpzIiwicHJpbW8tZXhwbG9yZVxcY3VzdG9tXFxVV19ORVdcXGpzXFxoaWRlU2hvd1N1bW1pdC5qcyIsInByaW1vLWV4cGxvcmVcXGN1c3RvbVxcVVdfTkVXXFxqc1xcbWFpbi5qcyIsInByaW1vLWV4cGxvcmVcXGN1c3RvbVxcVVdfTkVXXFxqc1xcc2luZ2xlRnVsbERpc3BsYXlFZGl0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBSSxNQUFNLFFBQVEsTUFBUixDQUFlLGdCQUFmLEVBQWdDLEVBQWhDLENBQVY7a0JBQ2UsRzs7O0FBRWYsSUFBSSxTQUFKLENBQWMsa0NBQWQsRUFBa0QsWUFBVztBQUN6RCxRQUFJLGFBQWEsQ0FBQyxRQUFELEVBQVcsVUFBVSxNQUFWLEVBQWtCOztBQUUxQyxlQUFPLE9BQVAsR0FBaUIsWUFBVztBQUN4QixnQkFBSSxXQUFXLGlCQUFmO0FBQ0EsZ0JBQUksV0FBVyxxQkFBZjs7QUFFQSxnQkFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixPQUFPLFFBQS9CLENBQWQ7QUFDQSxnQkFBRyxZQUFZLFNBQVosSUFBeUIsWUFBWSxJQUF4QyxFQUNJO0FBQ0osZ0JBQUksVUFBVSxRQUFRLHNCQUFSLENBQStCLGVBQS9CLENBQWQ7QUFDQSxpQkFBSSxJQUFJLElBQUUsQ0FBTixFQUFTLE1BQUksUUFBUSxNQUF6QixFQUFpQyxJQUFFLEdBQW5DLEVBQXdDLEdBQXhDLEVBQTZDO0FBQ3pDLG9CQUFJLE1BQU0sUUFBUSxDQUFSLEVBQVcsZ0JBQVgsQ0FBNEIsS0FBNUIsRUFBbUMsS0FBN0M7QUFDQSxvQkFBSSxJQUFJLE9BQUosQ0FBWSxjQUFZLFFBQXhCLEtBQXFDLENBQUMsQ0FBMUMsRUFBOEM7QUFDMUMsMEJBQU0sSUFBSSxPQUFKLENB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bmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnY2hhbmdlQWxtYVNraW4nLFtdKTtcclxuZXhwb3J0IGRlZmF1bHQgYXBwO1xyXG5cclxuYXBwLmRpcmVjdGl2ZSgncHJtRnVsbFZpZXdTZXJ2aWNlQ29udGFpbmVyQWZ0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb250cm9sbGVyID0gWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmZpeFNraW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIE9MRF9TS0lOID0gJ3V3X3NhbmRib3hfc2tpbic7XHJcbiAgICAgICAgICAgIHZhciBORVdfU0tJTiA9ICd1d19uZXdfc2FuZGJveF9za2luJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBzZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJHNjb3BlLnBhcmVudGlkKTtcclxuICAgICAgICAgICAgaWYoc2VjdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHNlY3Rpb24gPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBpZnJhbWVzID0gc2VjdGlvbi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYXNodXAtaWZyYW1lJyk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wLCBsZW49aWZyYW1lcy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcmMgPSBpZnJhbWVzW2ldLmdldEF0dHJpYnV0ZU5vZGUoJ3NyYycpLnZhbHVlOyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiggc3JjLmluZGV4T2YoJ3JlcS5za2luPScrT0xEX1NLSU4pICE9IC0xICkgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKCdyZXEuc2tpbj0nK09MRF9TS0lOLCAncmVxLnNraW49JytORVdfU0tJTik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lc1tpXS5nZXRBdHRyaWJ1dGVOb2RlKCdzcmMnKS52YWx1ZSA9IHNyYztcclxuICAgICAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1dO1xyXG4gICAgXHJcbiAgICB2YXIgdGVtcGxhdGUgPSAne3tmaXhTa2luKCl9fSc7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzY29wZTogeyBwYXJlbnRpZDogJ0AnfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gZWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICBzY29wZS5wYXJlbnRpZCA9IGlkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlcixcclxuICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcclxuICAgIH1cclxuICAgIFxyXG59KTtcclxuXHJcbiIsImxldCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnaGlkZVNob3dTdW1taXQnLFtdKTtcbmV4cG9ydCBkZWZhdWx0IGFwcDtcblxuLyogSGlkZS9TaG93IE90aGVyIEluc3RpdHV0aW9ucyBCdXR0b24gKi9cbmFwcC5jb21wb25lbnQoJ3BybUFsbWFNb3JlSW5zdEFmdGVyJywge1xuICAgY29udHJvbGxlcjogJ2luc3RpdHV0aW9uVG9nZ2xlQ29udHJvbGxlcicsXG4gICB0ZW1wbGF0ZTogYDxtZC1idXR0b24gY2xhc3M9XCJtZC1yYWlzZWRcIiBuZy1jbGljaz1cInRvZ2dsZUxpYnMoKVwiIGlkPVwic3VtbWl0QnV0dG9uXCJcbiAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9XCJzdW1taXRMaW5rc1wiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2hvdy9IaWRlIFN1bW1pdCBMaWJyYXJpZXNcIj5cbiAgICAgICAgICAgICAgIHt7IHNob3dMaWJzID8gJ0hpZGUgTGlicmFyaWVzJyA6ICdTaG93IExpYnJhcmllcycgfX1cbiAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPnt7c2hvd0xpYnMgPyAnJmxhcXVvOycgOiAnJnJhcXVvOycgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvbWQtYnV0dG9uPmBcbn0pXG4uY29udHJvbGxlcignaW5zdGl0dXRpb25Ub2dnbGVDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLnNob3dMaWJzID0gZmFsc2U7XG4gICAgICAkc2NvcGUuYnV0dG9uID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BybS1hbG1hLW1vcmUtaW5zdC1hZnRlciBidXR0b24nKSk7XG4gICAgICAkc2NvcGUudGFicyA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwcm0tYWxtYS1tb3JlLWluc3QgbWQtdGFicycpKTtcbiAgICAgICRzY29wZS50YWJzLmF0dHIoJ2lkJywnc3VtbWl0TGlua3MnKTtcbiAgICAgICRzY29wZS50YWJzLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAkc2NvcGUuYnV0dG9uLnBhcmVudCgpLmFmdGVyKCRzY29wZS50YWJzKTtcbiAgICAgIFxuICAgICAgXG4gICAgICAkc2NvcGUudG9nZ2xlTGlicyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgJHNjb3BlLnNob3dMaWJzID0gISRzY29wZS5zaG93TGlicztcbiAgICAgICAgIGlmICgkc2NvcGUudGFicy5oYXNDbGFzcygnaGlkZScpKSB7XG4gICAgICAgICAgICAkc2NvcGUudGFicy5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgJHNjb3BlLmJ1dHRvbi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLFwidHJ1ZVwiKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJHNjb3BlLnRhYnMuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgICRzY29wZS5idXR0b24uYXR0cihcImFyaWEtZXhwYW5kZWRcIixcImZhbHNlXCIpO1xuICAgICAgICAgfVxuICAgICAgfTtcbiAgIH07XG59XSk7IiwiaW1wb3J0IGNoYW5nZUFsbWFTa2luIGZyb20gJy4vY2hhbmdlQWxtYVNraW4nO1xyXG5pbXBvcnQgc3VtbWl0VGFicyBmcm9tICcuL2hpZGVTaG93U3VtbWl0JztcclxuaW1wb3J0IHNGREUgZnJvbSAnLi9zaW5nbGVGdWxsRGlzcGxheUVkaXRzJztcclxuXHJcbmxldCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndmlld0N1c3RvbScsWydhbmd1bGFyTG9hZCcsIHN1bW1pdFRhYnMubmFtZSwgY2hhbmdlQWxtYVNraW4ubmFtZSwgc0ZERS5uYW1lXSk7XHJcblxyXG5cclxuIiwibGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdzaW5nbGVGdWxsRGlzcGxheUVkaXRzJyxbXSk7XG5leHBvcnQgZGVmYXVsdCBhcHA7XG5cbmFwcC5jb21wb25lbnQoJ3BybUZ1bGxWaWV3QWZ0ZXInLCB7XG4gICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sIC8qYmluZCB0byBwYXJlbnRDdHJsIHRvIHJlYWQgUE5YKi9cbiAgIGNvbnRyb2xsZXI6ICdnZW5lcmljU0ZERUNvbnRyb2xsZXInLFxuICAgdGVtcGxhdGVVcmw6ICcvcHJpbW8tZXhwbG9yZS9jdXN0b20vVVdfTkVXL2h0bWwvZnVsbFBhZ2VPcHRpb25hbE5vdGVzLmh0bWwnXG59KVxuLmNvbnRyb2xsZXIoJ2dlbmVyaWNTRkRFQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICB2YXIgdm0gPSB0aGlzO1xuICAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBcbiAgICAgIHZhciBpc3NuID0gdm0ucGFyZW50Q3RybC5pdGVtLnBueC5zZWFyY2guaXNzbjtcbiAgICAgIGlmKCAkc2NvcGUuaXNIYXJ2YXJkQnVzaW5lc3NSZXZpZXdJdGVtKGlzc24pICkge1xuICAgICAgICAgdmFyIGhicl9ub3RlID0gYW5ndWxhci5lbGVtZW50KCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYWxOb3RlSEJSJykgKTtcbiAgICAgICAgIHZhciBmaXJzdF9pZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaWZyYW1lJylbMF07XG4gICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaWZyYW1lJykpO1xuICAgICAgICAgY29uc29sZS5sb2coJ0hFUkUnKTtcbiAgICAgICAgIGlmKGZpcnN0X2lmcmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZmlyc3RfaWZyYW1lKS5wYXJlbnQoKS5wcmVwZW5kKGhicl9ub3RlKTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH07XG4gICBcbiAgICRzY29wZS5pc0hhcnZhcmRCdXNpbmVzc1Jldmlld0l0ZW0gPSBmdW5jdGlvbihpc3NuKSB7XG4gICAgICBpZihpc3NuID09PSB1bmRlZmluZWQpXG4gICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHZhciBoYnJfcmVnZXggPSAvXjAwMTctPzgwMTIkL2c7ICAgIFxuICAgICAgaWYoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggaXNzbiApID09PSAnW29iamVjdCBBcnJheV0nICkge1xuICAgICAgICAgZm9yKHZhciBpPTA7IGk8aXNzbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoIGhicl9yZWdleC50ZXN0KFN0cmluZyhpc3NuW2ldKSkgKVxuICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICByZXR1cm4gZmFsc2U7ICAgIFxuICAgICAgfVxuICAgICAgaWYoIHR5cGVvZiBpc3NuID09PSAnc3RyaW5nJykge1xuICAgICAgICAgcmV0dXJuIGhicl9yZWdleC50ZXN0KGlzc24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgfTtcbiAgIFxuICAgJHNjb3BlLmFkZEhhcnZhcmRCdXNpbmVzc1Jldmlld05vdGljZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy92YXIgdmlld0l0ID0gYW5ndWxhci5lbGVtZW50KCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwcm0tZnVsbC12aWV3LWFmdGVyJykgKTtcbiAgICAgIFxuICAgICAgLy92YXIgbm90aWNlID0gYW5ndWxhci5lbGVtZW50KFwiPHA+VG8gYWNjZXNzIHRoZSBmdWxsLXRleHQgb2YgSGFydmFyZCBCdXNpbmVzcyBSZXZpZXcgYXJ0aWNsZXMsIHlvdSBtdXN0IHNlYXJjaCBmb3IgdGhlIGFydGljbGUgdGl0bGUgYXQgdGhlIDxhPmpvdXJuYWwncyBob21lcGFnZTwvYT4uPC9wPlwiKTtcbiAgICAgIC8vY29uc29sZS5sb2codmlld0l0KTtcbiAgICAgIC8vdmlld0l0LmFwcGVuZChub3RpY2UpO1xuICAgICAgXG4gICB9O1xuICAgXG4gICBcbn1dKTsiXX0=
