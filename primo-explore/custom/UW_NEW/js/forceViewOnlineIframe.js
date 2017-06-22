let app = angular.module('forceViewOnlineIframe',['$sce']);
export default app;

app.directive('prmViewOnlineAfter', function() {
    var controller = ['$scope', function ($scope) {
       
        $scope.updateHREF = function() {
            var url;
            var ALMA_DOMAIN = 'sandbox01-na.alma.exlibrisgroup.com';
            var ALMA_SKIN = 'uw_sandbox_skin';
            try {
                var links = document.getElementById($scope.parentid).getElementsByTagName('a');
                url = links[0].getAttribute('href');    
                if(url.indexOf(ALMA_DOMAIN) == -1)
                    url = 'null';
                else if(url.indexOf(ALMA_SKIN) == -1)
                    url = 'null';
            }
            catch(e) {
                url = 'null';
            }
            $scope.iframeurl = '' + url;
        }
        
        $scope.isAlmaIframe = function() {
            if($scope.iframeurl == 'null') 
                $scope.updateHREF();
            return ($scope.iframeurl != 'null');
            
        }     

        $scope.getIframeURL = function() {
            var url = $scope.iframeurl;
            if(url)
                return $sce.getTrustedUrl(url);
            else
                return '-';
        }
        
        $scope.getID = function() {
            return 'iframe_' + $scope.parentid;
        }
    }];
    
    var template = '<div ng-if="isAlmaIframe()" id={{getID()}} data-src={{getIframeURL()}}>HELLO</div>';

    return {
        scope: { 
            parentid: '@',
            iframeurl: '@',
        },
        link: function(scope, element, attrs) {
            // grab the top most id
            var parent = element.parent();
            var parentid = parent.attr('id');
            while(parentid === undefined) {
                parent = parent.parent();
                parentid = parent.attr('id');
            }
            scope.parentid = parentid;
            scope.iframeurl = 'null';
            
            
            
            
            
        },
        controller: controller,
        template: template
    }
    
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