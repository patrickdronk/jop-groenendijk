(function () {
    'use strict';

    angular
        .module('app')
        .directive('sidebar', sidebar);

    sidebar.$inject = [];

    /* @ngInject */
    function sidebar() {
        var directive = {
            templateUrl: 'app/components/sidebar/sidebar.html',
            restrict: 'E',
        };
        return directive;

        function link(scope, element, attrs) {
            
        }
    }

    sidebarController.$inject = [''];

    /* @ngInject */
    function sidebarController() {
        
    }

})();

