let app = angular.module('noAnimation',[]);
export default app;

app.component('prmSkipToAfter', {
    template: '<md-button ng-click="$ctrl.cancelAnimations()"><span>cancel animations</span></md-button>',
    bindings: {parentCtrl: '<'},
    controller: 'SkipToAfterController'

});

app.controller('SkipToAfterController', [function () {
    var vm = this;
    vm.cancelAnimations= cancelAnimations;

    function cancelAnimations(){
        console.log('cancelling app animations');
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '* {' +
        '/*CSS transitions*/' +
        ' -o-transition-property: none !important;' +
        ' -moz-transition-property: none !important;' +
        ' -ms-transition-property: none !important;' +
        ' -webkit-transition-property: none !important;' +
        '  transition-property: none !important;' +
        '/*CSS transforms*/' +
        '  -o-transform: none !important;' +
        ' -moz-transform: none !important;' +
        '   -ms-transform: none !important;' +
        '  -webkit-transform: none !important;' +
        '   transform: none !important;' +
        '  /*CSS animations*/' +
        '   -webkit-animation: none !important;' +
        '   -moz-animation: none !important;' +
        '   -o-animation: none !important;' +
        '   -ms-animation: none !important;' +
        '   animation: none !important;}';
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}]);