(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = angular.module('forceSkin', []);
exports.default = app;

/*
app.directive('prmFullViewServiceContainerAfter', function() {
    var controller = ['$scope', function ($scope) {
        
        $scope.fixSkin = function() {
            var OLD_SKIN = 'uw_sandbox_skin';
            var NEW_SKIN = 'uw_new_sandbox_skin';
            console.log('FIXSKINFIXSKINFIXSKINFIXSKINFIXSKINFIXSKINFIXSKINFIXSKIN');
            var section = document.getElementById($scope.parentid);
            if(section === undefined || section === null)
                return;
            var iframes = section.getElementsByClassName('mashup-iframe');
            for(var i=0, len=iframes.length; i<len; i++) {
                var src = iframes[i].getAttributeNode('src').value;        
                if( src.indexOf('req.skin='+OLD_SKIN) != -1 ) {               
                    src = src.replace('req.skin='+OLD_SKIN, 'req.skin='+NEW_SKIN);
                    iframes[i].getAttributeNode('src').value = src;
                }        
            }
            
        }
        
    }];
    
    var template = '{{fixSkin()}}';

    return {
        scope: { parentid: '@'},
        link: function(scope, element, attrs) {
            var id = element.parent().parent().parent().attr('id');
            scope.parentid = id;
        },
        controller: controller,
        template: template
    }
    
});

*/

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = angular.module('forceViewOnlineIframe', ['$sce']);
exports.default = app;


app.directive('prmViewOnlineAfter', function () {
    var controller = ['$scope', function ($scope) {

        $scope.updateHREF = function () {
            var url;
            var ALMA_DOMAIN = 'sandbox01-na.alma.exlibrisgroup.com';
            var ALMA_SKIN = 'uw_sandbox_skin';
            try {
                var links = document.getElementById($scope.parentid).getElementsByTagName('a');
                url = links[0].getAttribute('href');
                if (url.indexOf(ALMA_DOMAIN) == -1) url = 'null';else if (url.indexOf(ALMA_SKIN) == -1) url = 'null';
            } catch (e) {
                url = 'null';
            }
            $scope.iframeurl = '' + url;
        };

        $scope.isAlmaIframe = function () {
            if ($scope.iframeurl == 'null') $scope.updateHREF();
            return $scope.iframeurl != 'null';
        };

        $scope.getIframeURL = function () {
            var url = $scope.iframeurl;
            if (url) return $sce.getTrustedUrl(url);else return '-';
        };

        $scope.getID = function () {
            return 'iframe_' + $scope.parentid;
        };
    }];

    var template = '<div ng-if="isAlmaIframe()" id={{getID()}} data-src={{getIframeURL()}}>HELLO</div>';

    return {
        scope: {
            parentid: '@',
            iframeurl: '@'
        },
        link: function link(scope, element, attrs) {
            // grab the top most id
            var parent = element.parent();
            var parentid = parent.attr('id');
            while (parentid === undefined) {
                parent = parent.parent();
                parentid = parent.attr('id');
            }
            scope.parentid = parentid;
            scope.iframeurl = 'null';
        },
        controller: controller,
        template: template
    };
});

/*
app.component('prmViewOnlineAfter', {
    template: '<div>FORCEVO{{$ctrl.getIframe()}}</div>',
    bindings: {parentCtrl: '<'},
    controller: 'prmViewOnlineAfterController'

});

app.controller('prmViewOnlineAfterController', [function () {
    var vm = this;
    vm.getIframe = getIframe;

    function getIframe(){
        var ilink = '';
        try {
            ilink = vm.parentCtrl.item.linkElement.links[0].link;
        }
        catch(e) {
            ilink = '';
        }
        return 'caught';
    }
}]);
*/

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = angular.module('helloUser', []);
exports.default = app;


app.component('prmLogoAfter', {
    bindings: {},
    template: '<div class="hello-world"><span>Hello World</span></div>'
});

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var app = angular.module('showHideSummit', []);
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

},{}],5:[function(require,module,exports){
'use strict';

var _noAnimation = require('./noAnimation');

var _noAnimation2 = _interopRequireDefault(_noAnimation);

var _helloUser = require('./helloUser');

var _helloUser2 = _interopRequireDefault(_helloUser);

var _forceViewOnlineIframe = require('./forceViewOnlineIframe');

var _forceViewOnlineIframe2 = _interopRequireDefault(_forceViewOnlineIframe);

var _changeAlmaSkin = require('./changeAlmaSkin');

var _changeAlmaSkin2 = _interopRequireDefault(_changeAlmaSkin);

var _hideShowSummit = require('./hideShowSummit');

var _hideShowSummit2 = _interopRequireDefault(_hideShowSummit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module('viewCustom', ['angularLoad', _changeAlmaSkin2.default.name, _hideShowSummit2.default.name]);

},{"./changeAlmaSkin":1,"./forceViewOnlineIframe":2,"./helloUser":3,"./hideShowSummit":4,"./noAnimation":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = angular.module('noAnimation', []);
exports.default = app;


app.component('prmSkipToAfter', {
    template: '<md-button ng-click="$ctrl.cancelAnimations()"><span>cancel animations</span></md-button>',
    bindings: { parentCtrl: '<' },
    controller: 'SkipToAfterController'

});

app.controller('SkipToAfterController', [function () {
    var vm = this;
    vm.cancelAnimations = cancelAnimations;

    function cancelAnimations() {
        console.log('cancelling app animations');
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '* {' + '/*CSS transitions*/' + ' -o-transition-property: none !important;' + ' -moz-transition-property: none !important;' + ' -ms-transition-property: none !important;' + ' -webkit-transition-property: none !important;' + '  transition-property: none !important;' + '/*CSS transforms*/' + '  -o-transform: none !important;' + ' -moz-transform: none !important;' + '   -ms-transform: none !important;' + '  -webkit-transform: none !important;' + '   transform: none !important;' + '  /*CSS animations*/' + '   -webkit-animation: none !important;' + '   -moz-animation: none !important;' + '   -o-animation: none !important;' + '   -ms-animation: none !important;' + '   animation: none !important;}';
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}]);

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcmltby1leHBsb3JlXFxjdXN0b21cXFVXX05FV1xcanNcXGNoYW5nZUFsbWFTa2luLmpzIiwicHJpbW8tZXhwbG9yZVxcY3VzdG9tXFxVV19ORVdcXGpzXFxmb3JjZVZpZXdPbmxpbmVJZnJhbWUuanMiLCJwcmltby1leHBsb3JlXFxjdXN0b21cXFVXX05FV1xcanNcXGhlbGxvVXNlci5qcyIsInByaW1vLWV4cGxvcmVcXGN1c3RvbVxcVVdfTkVXXFxqc1xcaGlkZVNob3dTdW1taXQuanMiLCJwcmltby1leHBsb3JlXFxjdXN0b21cXFVXX05FV1xcanNcXG1haW4uanMiLCJwcmltby1leHBsb3JlXFxjdXN0b21cXFVXX05FV1xcanNcXG5vQW5pbWF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxJQUFJLE1BQU0sUUFBUSxNQUFSLENBQWUsV0FBZixFQUEyQixFQUEzQixDQUFWO2tCQUNlLEc7O0FBRWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQSxJQUFJLE1BQU0sUUFBUSxNQUFSLENBQWUsdUJBQWYsRUFBdUMsQ0FBQyxNQUFELENBQXZDLENBQVY7a0JBQ2UsRzs7O0FBRWYsSUFBSSxTQUFKLENBQWMsb0JBQWQsRUFBb0MsWUFBVztBQUMzQyxRQUFJLGFBQWEsQ0FBQyxRQUFELEVBQVcsVUFBVSxNQUFWLEVBQWtCOztBQUUxQyxlQUFPLFVBQVAsR0FBb0IsWUFBVztBQUMzQixnQkFBSSxHQUFKO0FBQ0EsZ0JBQUksY0FBYyxxQ0FBbEI7QUFDQSxnQkFBSSxZQUFZLGlCQUFoQjtBQUNBLGdCQUFJO0FBQ0Esb0JBQUksUUFBUSxTQUFTLGNBQVQsQ0FBd0IsT0FBTyxRQUEvQixFQUF5QyxvQkFBekMsQ0FBOEQsR0FBOUQsQ0FBWjtBQUNBLHNCQUFNLE1BQU0sQ0FBTixFQUFTLFlBQVQsQ0FBc0IsTUFB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QVFsQixrQ0FSa0IsR0FTbEIsbUNBVGtCLEdBVWxCLG9DQVZrQixHQVdsQix1Q0FYa0IsR0FZbEIsZ0NBWmtCLEdBYWxCLHNCQWJrQixHQWNsQix3Q0Fka0IsR0FlbEIscUNBZmtCLEdBZ0JsQixtQ0FoQmtCLEdBaUJsQixvQ0FqQmtCLEdBa0JsQixpQ0FsQkE7QUFtQkEsaUJBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUMsV0FBekMsQ0FBcUQsS0FBckQ7QUFDSDtBQUNKLENBN0J1QyxDQUF4QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZvcmNlU2tpbicsW10pO1xyXG5leHBvcnQgZGVmYXVsdCBhcHA7XHJcblxyXG4vKlxyXG5hcHAuZGlyZWN0aXZlKCdwcm1GdWxsVmlld1NlcnZpY2VDb250YWluZXJBZnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNvbnRyb2xsZXIgPSBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZml4U2tpbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgT0xEX1NLSU4gPSAndXdfc2FuZGJveF9za2luJztcclxuICAgICAgICAgICAgdmFyIE5FV19TS0lOID0gJ3V3X25ld19zYW5kYm94X3NraW4nO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRklYU0tJTkZJWFNLSU5GSVhTS0lORklYU0tJTkZJWFNLSU5GSVhTS0lORklYU0tJTkZJWFNLSU4nKTtcclxuICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgkc2NvcGUucGFyZW50aWQpO1xyXG4gICAgICAgICAgICBpZihzZWN0aW9uID09PSB1bmRlZmluZWQgfHwgc2VjdGlvbiA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGlmcmFtZXMgPSBzZWN0aW9uLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21hc2h1cC1pZnJhbWUnKTtcclxuICAgICAgICAgICAgZm9yKHZhciBpPTAsIGxlbj1pZnJhbWVzLmxlbmd0aDsgaTxsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNyYyA9IGlmcmFtZXNbaV0uZ2V0QXR0cmlidXRlTm9kZSgnc3JjJykudmFsdWU7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCBzcmMuaW5kZXhPZigncmVxLnNraW49JytPTERfU0tJTikgIT0gLTEgKSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gc3JjLnJlcGxhY2UoJ3JlcS5za2luPScrT0xEX1NLSU4sICdyZXEuc2tpbj0nK05FV19TS0lOKTtcclxuICAgICAgICAgICAgICAgICAgICBpZnJhbWVzW2ldLmdldEF0dHJpYnV0ZU5vZGUoJ3NyYycpLnZhbHVlID0gc3JjO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfV07XHJcbiAgICBcclxuICAgIHZhciB0ZW1wbGF0ZSA9ICd7e2ZpeFNraW4oKX19JztcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjb3BlOiB7IHBhcmVudGlkOiAnQCd9LFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBlbGVtZW50LnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIHNjb3BlLnBhcmVudGlkID0gaWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyLFxyXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxyXG4gICAgfVxyXG4gICAgXHJcbn0pO1xyXG5cclxuKi8iLCJsZXQgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZvcmNlVmlld09ubGluZUlmcmFtZScsWyckc2NlJ10pO1xyXG5leHBvcnQgZGVmYXVsdCBhcHA7XHJcblxyXG5hcHAuZGlyZWN0aXZlKCdwcm1WaWV3T25saW5lQWZ0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjb250cm9sbGVyID0gWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICBcclxuICAgICAgICAkc2NvcGUudXBkYXRlSFJFRiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsO1xyXG4gICAgICAgICAgICB2YXIgQUxNQV9ET01BSU4gPSAnc2FuZGJveDAxLW5hLmFsbWEuZXhsaWJyaXNncm91cC5jb20nO1xyXG4gICAgICAgICAgICB2YXIgQUxNQV9TS0lOID0gJ3V3X3NhbmRib3hfc2tpbic7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgkc2NvcGUucGFyZW50aWQpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBsaW5rc1swXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTsgICAgXHJcbiAgICAgICAgICAgICAgICBpZih1cmwuaW5kZXhPZihBTE1BX0RPTUFJTikgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gJ251bGwnO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih1cmwuaW5kZXhPZihBTE1BX1NLSU4pID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9ICdudWxsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSAnbnVsbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLmlmcmFtZXVybCA9ICcnICsgdXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuaXNBbG1hSWZyYW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKCRzY29wZS5pZnJhbWV1cmwgPT0gJ251bGwnKSBcclxuICAgICAgICAgICAgICAgICRzY29wZS51cGRhdGVIUkVGKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoJHNjb3BlLmlmcmFtZXVybCAhPSAnbnVsbCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ICAgICBcclxuXHJcbiAgICAgICAgJHNjb3BlLmdldElmcmFtZVVSTCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gJHNjb3BlLmlmcmFtZXVybDtcclxuICAgICAgICAgICAgaWYodXJsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY2UuZ2V0VHJ1c3RlZFVybCh1cmwpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJy0nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuZ2V0SUQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdpZnJhbWVfJyArICRzY29wZS5wYXJlbnRpZDtcclxuICAgICAgICB9XHJcbiAgICB9XTtcclxuICAgIFxyXG4gICAgdmFyIHRlbXBsYXRlID0gJzxkaXYgbmctaWY9XCJpc0FsbWFJZnJhbWUoKVwiIGlkPXt7Z2V0SUQoKX19IGRhdGEtc3JjPXt7Z2V0SWZyYW1lVVJMKCl9fT5IRUxMTzwvZGl2Pic7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzY29wZTogeyBcclxuICAgICAgICAgICAgcGFyZW50aWQ6ICdAJyxcclxuICAgICAgICAgICAgaWZyYW1ldXJsOiAnQCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgLy8gZ3JhYiB0aGUgdG9wIG1vc3QgaWRcclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50KCk7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRpZCA9IHBhcmVudC5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB3aGlsZShwYXJlbnRpZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRpZCA9IHBhcmVudC5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjb3BlLnBhcmVudGlkID0gcGFyZW50aWQ7XHJcbiAgICAgICAgICAgIHNjb3BlLmlmcmFtZXVybCA9ICdudWxsJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlcixcclxuICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcclxuICAgIH1cclxuICAgIFxyXG59KTtcclxuXHJcbi8qXHJcbmFwcC5jb21wb25lbnQoJ3BybVZpZXdPbmxpbmVBZnRlcicsIHtcclxuICAgIHRlbXBsYXRlOiAnPGRpdj5GT1JDRVZPe3skY3RybC5nZXRJZnJhbWUoKX19PC9kaXY+JyxcclxuICAgIGJpbmRpbmdzOiB7cGFyZW50Q3RybDogJzwnfSxcclxuICAgIGNvbnRyb2xsZXI6ICdwcm1WaWV3T25saW5lQWZ0ZXJDb250cm9sbGVyJ1xyXG5cclxufSk7XHJcblxyXG5hcHAuY29udHJvbGxlcigncHJtVmlld09ubGluZUFmdGVyQ29udHJvbGxlcicsIFtmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uZ2V0SWZyYW1lID0gZ2V0SWZyYW1lO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldElmcmFtZSgpe1xyXG4gICAgICAgIHZhciBpbGluayA9ICcnO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlsaW5rID0gdm0ucGFyZW50Q3RybC5pdGVtLmxpbmtFbGVtZW50LmxpbmtzWzBdLmxpbms7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgaWxpbmsgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICdjYXVnaHQnO1xyXG4gICAgfVxyXG59XSk7XHJcbiovIiwibGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdoZWxsb1VzZXInLFtdKTtcclxuZXhwb3J0IGRlZmF1bHQgYXBwO1xyXG5cclxuYXBwLmNvbXBvbmVudCgncHJtTG9nb0FmdGVyJywge1xyXG4gICAgYmluZGluZ3M6IHsgfSxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImhlbGxvLXdvcmxkXCI+PHNwYW4+SGVsbG8gV29ybGQ8L3NwYW4+PC9kaXY+YFxyXG59KTsiLCJsZXQgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3Nob3dIaWRlU3VtbWl0JyxbXSk7XG5leHBvcnQgZGVmYXVsdCBhcHA7XG5cbi8qIEhpZGUvU2hvdyBPdGhlciBJbnN0aXR1dGlvbnMgQnV0dG9uICovXG5hcHAuY29tcG9uZW50KCdwcm1BbG1hTW9yZUluc3RBZnRlcicsIHtcbiAgIGNvbnRyb2xsZXI6ICdpbnN0aXR1dGlvblRvZ2dsZUNvbnRyb2xsZXInLFxuICAgdGVtcGxhdGU6IGA8bWQtYnV0dG9uIGNsYXNzPVwibWQtcmFpc2VkXCIgbmctY2xpY2s9XCJ0b2dnbGVMaWJzKClcIiBpZD1cInN1bW1pdEJ1dHRvblwiXG4gICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPVwic3VtbWl0TGlua3NcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNob3cvSGlkZSBTdW1taXQgTGlicmFyaWVzXCI+XG4gICAgICAgICAgICAgICB7eyBzaG93TGlicyA/ICdIaWRlIExpYnJhcmllcycgOiAnU2hvdyBMaWJyYXJpZXMnIH19XG4gICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj57e3Nob3dMaWJzID8gJyZsYXF1bzsnIDogJyZyYXF1bzsnIH19PC9zcGFuPlxuICAgICAgICAgICAgICA8L21kLWJ1dHRvbj5gXG59KVxuLmNvbnRyb2xsZXIoJ2luc3RpdHV0aW9uVG9nZ2xlQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5zaG93TGlicyA9IGZhbHNlO1xuICAgICAgJHNjb3BlLmJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwcm0tYWxtYS1tb3JlLWluc3QtYWZ0ZXIgYnV0dG9uJykpO1xuICAgICAgJHNjb3BlLnRhYnMgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncHJtLWFsbWEtbW9yZS1pbnN0IG1kLXRhYnMnKSk7XG4gICAgICAkc2NvcGUudGFicy5hdHRyKCdpZCcsJ3N1bW1pdExpbmtzJyk7XG4gICAgICAkc2NvcGUudGFicy5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgJHNjb3BlLmJ1dHRvbi5wYXJlbnQoKS5hZnRlcigkc2NvcGUudGFicyk7XG4gICAgICBcbiAgICAgIFxuICAgICAgJHNjb3BlLnRvZ2dsZUxpYnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICRzY29wZS5zaG93TGlicyA9ICEkc2NvcGUuc2hvd0xpYnM7XG4gICAgICAgICBpZiAoJHNjb3BlLnRhYnMuaGFzQ2xhc3MoJ2hpZGUnKSkge1xuICAgICAgICAgICAgJHNjb3BlLnRhYnMucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgICRzY29wZS5idXR0b24uYXR0cihcImFyaWEtZXhwYW5kZWRcIixcInRydWVcIik7XG4gICAgICAgICB9XG4gICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRzY29wZS50YWJzLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICAkc2NvcGUuYnV0dG9uLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsXCJmYWxzZVwiKTtcbiAgICAgICAgIH1cbiAgICAgIH07XG4gICB9O1xufV0pOyIsImltcG9ydCBub0FuaW1hdGlvbiBmcm9tICcuL25vQW5pbWF0aW9uJztcclxuaW1wb3J0IGhlbGxvVXNlciBmcm9tICcuL2hlbGxvVXNlcic7XHJcbmltcG9ydCB2TyBmcm9tICcuL2ZvcmNlVmlld09ubGluZUlmcmFtZSc7XHJcbmltcG9ydCBjaGFuZ2VBbG1hU2tpbiBmcm9tICcuL2NoYW5nZUFsbWFTa2luJztcclxuaW1wb3J0IHN1bW1pdFRhYnMgZnJvbSAnLi9oaWRlU2hvd1N1bW1pdCdcclxubGV0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCd2aWV3Q3VzdG9tJyxbJ2FuZ3VsYXJMb2FkJyxjaGFuZ2VBbG1hU2tpbi5uYW1lLHN1bW1pdFRhYnMubmFtZV0pO1xyXG5cclxuXHJcbiIsImxldCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnbm9BbmltYXRpb24nLFtdKTtcclxuZXhwb3J0IGRlZmF1bHQgYXBwO1xyXG5cclxuYXBwLmNvbXBvbmVudCgncHJtU2tpcFRvQWZ0ZXInLCB7XHJcbiAgICB0ZW1wbGF0ZTogJzxtZC1idXR0b24gbmctY2xpY2s9XCIkY3RybC5jYW5jZWxBbmltYXRpb25zKClcIj48c3Bhbj5jYW5jZWwgYW5pbWF0aW9uczwvc3Bhbj48L21kLWJ1dHRvbj4nLFxyXG4gICAgYmluZGluZ3M6IHtwYXJlbnRDdHJsOiAnPCd9LFxyXG4gICAgY29udHJvbGxlcjogJ1NraXBUb0FmdGVyQ29udHJvbGxlcidcclxuXHJcbn0pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ1NraXBUb0FmdGVyQ29udHJvbGxlcicsIFtmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgdm0uY2FuY2VsQW5pbWF0aW9ucz0gY2FuY2VsQW5pbWF0aW9ucztcclxuXHJcbiAgICBmdW5jdGlvbiBjYW5jZWxBbmltYXRpb25zKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NhbmNlbGxpbmcgYXBwIGFuaW1hdGlvbnMnKTtcclxuICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xyXG4gICAgICAgIHN0eWxlLmlubmVySFRNTCA9ICcqIHsnICtcclxuICAgICAgICAnLypDU1MgdHJhbnNpdGlvbnMqLycgK1xyXG4gICAgICAgICcgLW8tdHJhbnNpdGlvbi1wcm9wZXJ0eTogbm9uZSAhaW1wb3J0YW50OycgK1xyXG4gICAgICAgICcgLW1vei10cmFuc2l0aW9uLXByb3BlcnR5OiBub25lICFpbXBvcnRhbnQ7JyArXHJcbiAgICAgICAgJyAtbXMtdHJhbnNpdGlvbi1wcm9wZXJ0eTogbm9uZSAhaW1wb3J0YW50OycgK1xyXG4gICAgICAgICcgLXdlYmtpdC10cmFuc2l0aW9uLXByb3BlcnR5OiBub25lICFpbXBvcnRhbnQ7JyArXHJcbiAgICAgICAgJyAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogbm9uZSAhaW1wb3J0YW50OycgK1xyXG4gICAgICAgICcvKkNTUyB0cmFuc2Zvcm1zKi8nICtcclxuICAgICAgICAnICAtby10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDsnICtcclxuICAgICAgICAnIC1tb3otdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7JyArXHJcbiAgICAgICAgJyAgIC1tcy10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDsnICtcclxuICAgICAgICAnICAtd2Via2l0LXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50OycgK1xyXG4gICAgICAgICcgICB0cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDsnICtcclxuICAgICAgICAnICAvKkNTUyBhbmltYXRpb25zKi8nICtcclxuICAgICAgICAnICAgLXdlYmtpdC1hbmltYXRpb246IG5vbmUgIWltcG9ydGFudDsnICtcclxuICAgICAgICAnICAgLW1vei1hbmltYXRpb246IG5vbmUgIWltcG9ydGFudDsnICtcclxuICAgICAgICAnICAgLW8tYW5pbWF0aW9uOiBub25lICFpbXBvcnRhbnQ7JyArXHJcbiAgICAgICAgJyAgIC1tcy1hbmltYXRpb246IG5vbmUgIWltcG9ydGFudDsnICtcclxuICAgICAgICAnICAgYW5pbWF0aW9uOiBub25lICFpbXBvcnRhbnQ7fSc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZSk7XHJcbiAgICB9XHJcbn1dKTsiXX0=
