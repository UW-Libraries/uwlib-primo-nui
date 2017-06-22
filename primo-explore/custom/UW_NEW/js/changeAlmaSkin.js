let app = angular.module('forceSkin',[]);
export default app;

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