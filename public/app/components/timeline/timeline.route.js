(function() {
  'use strict';

  angular
    .module('timeline')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider

      .state('home.timeline', {
        url: "/timeline",
          views: {
              "content@home": {
                  templateUrl: "app/components/timeline/timeline.html",
                  controller: "TimelineController as vm"
              }
          },
        data:
        {
            requiredLogin: true
        }
      });
  }
})();
