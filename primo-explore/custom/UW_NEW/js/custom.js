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

var app = angular.module('viewCustom', ['angularLoad', _hideShowSummit2.default.name, _singleFullDisplayEdits2.default.name]);

},{"./changeAlmaSkin":1,"./hideShowSummit":2,"./singleFullDisplayEdits":4}],4:[function(require,module,exports){
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
        this.addNoteHBR = false;
        //this._$scope.almaMashups = this._$elem.parent()[0].querySelector('iframe');
    }

    _createClass(GenericSFDEController, [{
        key: '$onInit',
        value: function $onInit() {
            this.addNoteHBR = this.isHarvardBusinessReviewItem();
        }
    }, {
        key: '$postLink',
        value: function $postLink() {

            var elem = this._$elem;
            console.log('POSTLINK');
            if (this.addNoteHBR) {
                this._$scope.$watch(function () {
                    return elem.parent()[0].querySelector('prm-alma-mashup');
                }, function (mashupElem, nullVal) {
                    if (mashupElem !== null) {
                        // we can move the note
                        angular.element(mashupElem).prepend(document.getElementById('localNoteHBR'));
                    }
                });
            }
        }
    }, {
        key: 'moveNote',
        value: function moveNote(noteID) {
            console.log('MOVE');
            var note = this._$elem[0].querySelector('#' + noteID);
            console.log(note);
            this.almaMashups[0].prepend(note);
        }
    }, {
        key: 'isHarvardBusinessReviewItem',
        value: function isHarvardBusinessReviewItem() {
            if (this.parentCtrl.index != 1) // is not the view it online tab
                return;
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
    }, {
        key: 'fixAlmaSkin',
        value: function fixAlmaSkin() {
            var OLD_SKIN = 'uw_sandbox_skin';
            var NEW_SKIN = 'uw_new_sandbox_skin';

            var iframe = this._$elem.parent()[0].querySelector('iframe');
            console.log(iframe);
            if (iframe === undefined || iframe === null) return;
            console.log('iframe found');
            var src = iframe.getAttributeNode('src').value;
            if (src.indexOf('req.skin=' + OLD_SKIN) != -1) {
                src = src.replace('req.skin=' + OLD_SKIN, 'req.skin=' + NEW_SKIN);
                iframe.getAttributeNode('src').value = src;
                iframe.getAttributeNode('ng-src').value = src;
            }
        }
    }]);

    return GenericSFDEController;
}();

app.component('prmFullViewServiceContainerAfter', {
    bindings: { parentCtrl: '<' }, /*bind to parentCtrl to read PNX*/
    controller: 'genericSFDEController',
    templateUrl: '/primo-explore/custom/UW_NEW/html/fullPageOptionalNotes.html'
}).controller('genericSFDEController', GenericSFDEController);

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlXFxjdXN0b21cXFVXX05FV1xcanNcXGNoYW5nZUFsbWFTa2luLmpzIiwicHJpbW8tZXhwbG9yZVxcY3VzdG9tXFxVV19ORVdcXGpzXFxoaWRlU2hvd1N1bW1pdC5qcyIsInByaW1vLWV4cGxvcmVcXGN1c3RvbVxcVVdfTkVXXFxqc1xcbWFpbi5qcyIsInByaW1vLWV4cGxvcmVcXGN1c3RvbVxcVVdfTkVXXFxqc1xcc2luZ2xlRnVsbERpc3BsYXlFZGl0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBSSxNQUFNLFFBQVEsTUFBUixDQUFlLGdCQUFmLEVBQWdDLEVBQWhDLENBQVY7a0JBQ2UsRzs7O0FBRWYsSUFBSSxTQUFKLENBQWMsa0NBQWQsRUFBa0QsWUFBVztBQUN6RCxRQUFJLGFBQWEsQ0FBQyxRQUFELEVBQVcsVUFBVSxNQUFWLEVBQWtCOztBQUUxQyxlQUFPLE9BQVAsR0FBaUIsWUFBVztBQUN4QixnQkFBSSxXQUFXLGlCQUFmO0FBQ0EsZ0JBQUksV0FBVyxxQkFBZjs7QUFFQSxnQkFBSSxVQUFVLFNBQVMsY0FBVCxDQUF3QixPQUFPLFFBQS9CLENBQWQ7QUFDQSxnQkFBRyxZQUFZLFNBQVosSUFBeUIsWUFBWSxJQUF4QyxFQUNJO0FBQ0osZ0JBQUksVUFBVSxRQUFRLHNCQUFSLENBQStCLGVBQS9CLENBQWQ7QUFDQSxpQkFBSSxJQUFJLElBQUUsQ0FBTixFQUFTLE1BQUksUUFBUSxNQUF6QixFQUFpQyxJQUFFLEdBQW5DLEVBQXdDLEdBQXhDLEVBQTZDO0FBQ3pDLG9CQUFJLE1BQU0sUUFBUSxDQUFSLEVBQVcsZ0JBQVgsQ0FBNEIsS0FBNUIsRUFBbUMsS0FBN0M7QUFDQSxvQkFBSSxJQUFJLE9BQUosQ0FBWSxjQUFZLFFBQXhCLEtBQXFDLENBQUMsQ0FBMUMsRUFBOEM7QUFDMUMsMEJBQU0sSUFBSSxPQUFKLENB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RjtBQUNELGdCQUFJLE9BQU8sSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMzQix1QkFBTyxVQUFVLElBQVYsQ0FBZSxJQUFmLENBQVA7QUFDRjtBQUNELG1CQUFPLEtBQVA7QUFDRjs7O3NDQUVjO0FBQ1YsZ0JBQUksV0FBVyxpQkFBZjtBQUNBLGdCQUFJLFdBQVcscUJBQWY7O0FBR0EsZ0JBQUksU0FBUyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQXFCLENBQXJCLEVBQXdCLGFBQXhCLENBQXNDLFFBQXRDLENBQWI7QUFDQSxvQkFBUSxHQUFSLENBQVksTUFBWjtBQUNBLGdCQUFHLFdBQVcsU0FBWCxJQUF3QixXQUFXLElBQXRDLEVBQ0k7QUFDSixvQkFBUSxHQUFSLENBQVksY0FBWjtBQUNBLGdCQUFJLE1BQU0sT0FBTyxnQkFBUCxDQUF3QixLQUF4QixFQUErQixLQUF6QztBQUNBLGdCQUFJLElBQUksT0FBSixDQUFZLGNBQVksUUFBeEIsS0FBcUMsQ0FBQyxDQUExQyxFQUE4QztBQUMxQyxzQkFBTSxJQUFJLE9BQUosQ0FBWSxjQUFZLFFBQXhCLEVBQWtDLGNBQVksUUFBOUMsQ0FBTjtBQUNBLHVCQUFPLGdCQUFQLENBQXdCLEtBQXhCLEVBQStCLEtBQS9CLEdBQXVDLEdBQXZDO0FBQ0EsdUJBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBbEMsR0FBMEMsR0FBMUM7QUFDSDtBQUVKOzs7Ozs7QUFHTCxJQUFJLFNBQUosQ0FBYyxrQ0FBZCxFQUFrRDtBQUM5QyxjQUFVLEVBQUMsWUFBWSxHQUFiLEVBRG9DLEVBQ2pCO0FBQzdCLGdCQUFZLHVCQUZrQztBQUc5QyxpQkFBYTtBQUhpQyxDQUFsRCxFQUlHLFVBSkgsQ0FJYyx1QkFKZCxFQUlzQyxxQkFKdEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdjaGFuZ2VBbG1hU2tpbicsW10pO1xyXG5leHBvcnQgZGVmYXVsdCBhcHA7XHJcblxyXG5hcHAuZGlyZWN0aXZlKCdwcm1GdWxsVmlld1NlcnZpY2VDb250YWluZXJBZnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZml4U2tpbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgT0xEX1NLSU4gPSAndXdfc2FuZGJveF9za2luJztcclxuICAgICAgICAgICAgdmFyIE5FV19TS0lOID0gJ3V3X25ld19zYW5kYm94X3NraW4nO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgkc2NvcGUucGFyZW50aWQpO1xyXG4gICAgICAgICAgICBpZihzZWN0aW9uID09PSB1bmRlZmluZWQgfHwgc2VjdGlvbiA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGlmcmFtZXMgPSBzZWN0aW9uLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21hc2h1cC1pZnJhbWUnKTtcclxuICAgICAgICAgICAgZm9yKHZhciBpPTAsIGxlbj1pZnJhbWVzLmxlbmd0aDsgaTxsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNyYyA9IGlmcmFtZXNbaV0uZ2V0QXR0cmlidXRlTm9kZSgnc3JjJykudmFsdWU7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCBzcmMuaW5kZXhPZigncmVxLnNraW49JytPTERfU0tJTikgIT0gLTEgKSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gc3JjLnJlcGxhY2UoJ3JlcS5za2luPScrT0xEX1NLSU4sICdyZXEuc2tpbj0nK05FV19TS0lOKTtcclxuICAgICAgICAgICAgICAgICAgICBpZnJhbWVzW2ldLmdldEF0dHJpYnV0ZU5vZGUoJ3NyYycpLnZhbHVlID0gc3JjO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfV07XHJcbiAgICBcclxuICAgIHZhciB0ZW1wbGF0ZSA9ICd7e2ZpeFNraW4oKX19JztcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjb3BlOiB7IHBhcmVudGlkOiAnQCd9LFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBlbGVtZW50LnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIHNjb3BlLnBhcmVudGlkID0gaWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyLFxyXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxyXG4gICAgfVxyXG4gICAgXHJcbn0pO1xyXG5cclxuIiwibGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdoaWRlU2hvd1N1bW1pdCcsW10pO1xuZXhwb3J0IGRlZmF1bHQgYXBwO1xuXG4vKiBIaWRlL1Nob3cgT3RoZXIgSW5zdGl0dXRpb25zIEJ1dHRvbiAqL1xuYXBwLmNvbXBvbmVudCgncHJtQWxtYU1vcmVJbnN0QWZ0ZXInLCB7XG4gICBjb250cm9sbGVyOiAnaW5zdGl0dXRpb25Ub2dnbGVDb250cm9sbGVyJyxcbiAgIHRlbXBsYXRlOiBgPG1kLWJ1dHRvbiBjbGFzcz1cIm1kLXJhaXNlZFwiIG5nLWNsaWNrPVwidG9nZ2xlTGlicygpXCIgaWQ9XCJzdW1taXRCdXR0b25cIlxuICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz1cInN1bW1pdExpbmtzXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTaG93L0hpZGUgU3VtbWl0IExpYnJhcmllc1wiPlxuICAgICAgICAgICAgICAge3sgc2hvd0xpYnMgPyAnSGlkZSBMaWJyYXJpZXMnIDogJ1Nob3cgTGlicmFyaWVzJyB9fVxuICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3tzaG93TGlicyA/ICcmbGFxdW87JyA6ICcmcmFxdW87JyB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9tZC1idXR0b24+YFxufSlcbi5jb250cm9sbGVyKCdpbnN0aXR1dGlvblRvZ2dsZUNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuc2hvd0xpYnMgPSBmYWxzZTtcbiAgICAgICRzY29wZS5idXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncHJtLWFsbWEtbW9yZS1pbnN0LWFmdGVyIGJ1dHRvbicpKTtcbiAgICAgICRzY29wZS50YWJzID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BybS1hbG1hLW1vcmUtaW5zdCBtZC10YWJzJykpO1xuICAgICAgJHNjb3BlLnRhYnMuYXR0cignaWQnLCdzdW1taXRMaW5rcycpO1xuICAgICAgJHNjb3BlLnRhYnMuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICRzY29wZS5idXR0b24ucGFyZW50KCkuYWZ0ZXIoJHNjb3BlLnRhYnMpO1xuICAgICAgXG4gICAgICBcbiAgICAgICRzY29wZS50b2dnbGVMaWJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAkc2NvcGUuc2hvd0xpYnMgPSAhJHNjb3BlLnNob3dMaWJzO1xuICAgICAgICAgaWYgKCRzY29wZS50YWJzLmhhc0NsYXNzKCdoaWRlJykpIHtcbiAgICAgICAgICAgICRzY29wZS50YWJzLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICAkc2NvcGUuYnV0dG9uLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsXCJ0cnVlXCIpO1xuICAgICAgICAgfVxuICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUudGFicy5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgJHNjb3BlLmJ1dHRvbi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLFwiZmFsc2VcIik7XG4gICAgICAgICB9XG4gICAgICB9O1xuICAgfTtcbn1dKTsiLCJpbXBvcnQgY2hhbmdlQWxtYVNraW4gZnJvbSAnLi9jaGFuZ2VBbG1hU2tpbic7XHJcbmltcG9ydCBzdW1taXRUYWJzIGZyb20gJy4vaGlkZVNob3dTdW1taXQnO1xyXG5pbXBvcnQgc0ZERSBmcm9tICcuL3NpbmdsZUZ1bGxEaXNwbGF5RWRpdHMnO1xyXG5cclxubGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd2aWV3Q3VzdG9tJyxbJ2FuZ3VsYXJMb2FkJywgc3VtbWl0VGFicy5uYW1lLCBzRkRFLm5hbWVdKTtcclxuXHJcblxyXG4iLCJsZXQgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3NpbmdsZUZ1bGxEaXNwbGF5RWRpdHMnLFtdKTtcbmV4cG9ydCBkZWZhdWx0IGFwcDtcblxuY2xhc3MgR2VuZXJpY1NGREVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuXyRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5fJGVsZW0gPSAkZWxlbWVudDtcbiAgICAgICAgdGhpcy5hZGROb3RlSEJSID0gZmFsc2U7XG4gICAgICAgIC8vdGhpcy5fJHNjb3BlLmFsbWFNYXNodXBzID0gdGhpcy5fJGVsZW0ucGFyZW50KClbMF0ucXVlcnlTZWxlY3RvcignaWZyYW1lJyk7XG4gICAgfVxuICAgICRvbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYWRkTm90ZUhCUiA9IHRoaXMuaXNIYXJ2YXJkQnVzaW5lc3NSZXZpZXdJdGVtKCk7XG4gICAgfVxuICAgICRwb3N0TGluaygpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBlbGVtID0gdGhpcy5fJGVsZW07XG4gICAgICAgIGNvbnNvbGUubG9nKCdQT1NUTElOSycpO1xuICAgICAgICBpZih0aGlzLmFkZE5vdGVIQlIpIHtcbiAgICAgICAgICAgIHRoaXMuXyRzY29wZS4kd2F0Y2goXG4gICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgcmV0dXJuIGVsZW0ucGFyZW50KClbMF0ucXVlcnlTZWxlY3RvcigncHJtLWFsbWEtbWFzaHVwJyk7IH0sXG4gICAgICAgICAgICAgICBmdW5jdGlvbihtYXNodXBFbGVtLCBudWxsVmFsKSB7XG4gICAgICAgICAgICAgICAgICBpZihtYXNodXBFbGVtICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAvLyB3ZSBjYW4gbW92ZSB0aGUgbm90ZVxuICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG1hc2h1cEVsZW0pLnByZXBlbmQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2FsTm90ZUhCUicpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICk7XG5cblxuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgXG4gICAgXG4gICAgbW92ZU5vdGUobm90ZUlEKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNT1ZFJyk7XG4gICAgICAgIHZhciBub3RlID0gdGhpcy5fJGVsZW1bMF0ucXVlcnlTZWxlY3RvcignIycrbm90ZUlEKTtcbiAgICAgICAgY29uc29sZS5sb2cobm90ZSk7XG4gICAgICAgIHRoaXMuYWxtYU1hc2h1cHNbMF0ucHJlcGVuZChub3RlKTtcbiAgICAgICAgXG4gICAgfVxuICAgIGlzSGFydmFyZEJ1c2luZXNzUmV2aWV3SXRlbSgpIHtcbiAgICAgIGlmKHRoaXMucGFyZW50Q3RybC5pbmRleCAhPSAxKSAvLyBpcyBub3QgdGhlIHZpZXcgaXQgb25saW5lIHRhYlxuICAgICAgICAgcmV0dXJuO1xuICAgICAgdmFyIGlzc24gPSB0aGlzLnBhcmVudEN0cmwuaXRlbS5wbnguc2VhcmNoLmlzc247XG4gICAgICBpZihpc3NuID09PSB1bmRlZmluZWQpXG4gICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHZhciBoYnJfcmVnZXggPSAvXjAwMTctPzgwMTIkL2c7ICAgIFxuICAgICAgaWYoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggaXNzbiApID09PSAnW29iamVjdCBBcnJheV0nICkge1xuICAgICAgICAgZm9yKHZhciBpPTA7IGk8aXNzbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoIGhicl9yZWdleC50ZXN0KFN0cmluZyhpc3NuW2ldKSkgKVxuICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICByZXR1cm4gZmFsc2U7ICAgIFxuICAgICAgfVxuICAgICAgaWYoIHR5cGVvZiBpc3NuID09PSAnc3RyaW5nJykge1xuICAgICAgICAgcmV0dXJuIGhicl9yZWdleC50ZXN0KGlzc24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgfTtcbiAgIFxuICAgIGZpeEFsbWFTa2luKCkge1xuICAgICAgICB2YXIgT0xEX1NLSU4gPSAndXdfc2FuZGJveF9za2luJztcbiAgICAgICAgdmFyIE5FV19TS0lOID0gJ3V3X25ld19zYW5kYm94X3NraW4nO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciBpZnJhbWUgPSB0aGlzLl8kZWxlbS5wYXJlbnQoKVswXS5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcbiAgICAgICAgY29uc29sZS5sb2coaWZyYW1lKTtcbiAgICAgICAgaWYoaWZyYW1lID09PSB1bmRlZmluZWQgfHwgaWZyYW1lID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmxvZygnaWZyYW1lIGZvdW5kJyk7XG4gICAgICAgIHZhciBzcmMgPSBpZnJhbWUuZ2V0QXR0cmlidXRlTm9kZSgnc3JjJykudmFsdWU7ICAgICAgICBcbiAgICAgICAgaWYoIHNyYy5pbmRleE9mKCdyZXEuc2tpbj0nK09MRF9TS0lOKSAhPSAtMSApIHsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKCdyZXEuc2tpbj0nK09MRF9TS0lOLCAncmVxLnNraW49JytORVdfU0tJTik7XG4gICAgICAgICAgICBpZnJhbWUuZ2V0QXR0cmlidXRlTm9kZSgnc3JjJykudmFsdWUgPSBzcmM7XG4gICAgICAgICAgICBpZnJhbWUuZ2V0QXR0cmlidXRlTm9kZSgnbmctc3JjJykudmFsdWUgPSBzcmM7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgfVxufVxuXG5hcHAuY29tcG9uZW50KCdwcm1GdWxsVmlld1NlcnZpY2VDb250YWluZXJBZnRlcicsIHtcbiAgICBiaW5kaW5nczoge3BhcmVudEN0cmw6ICc8J30sIC8qYmluZCB0byBwYXJlbnRDdHJsIHRvIHJlYWQgUE5YKi9cbiAgICBjb250cm9sbGVyOiAnZ2VuZXJpY1NGREVDb250cm9sbGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy9wcmltby1leHBsb3JlL2N1c3RvbS9VV19ORVcvaHRtbC9mdWxsUGFnZU9wdGlvbmFsTm90ZXMuaHRtbCdcbn0pLmNvbnRyb2xsZXIoJ2dlbmVyaWNTRkRFQ29udHJvbGxlcicsR2VuZXJpY1NGREVDb250cm9sbGVyKVxuXG4iXX0=
