function TabsController($scope) {

}

angular.module('tabs', []).
  directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
   '<div id="container">' +
     '<div class="tab-strip">' +
       '<aside>Angular Component</aside>' + 
       '<div class="tab-wrapper">' +
         '<h2 ng-repeat="pane in panes" ng-click="select(pane)" ng-class="{active:pane.selected}">{{pane.title}}</h2>' +
       '</div>' +
     '</div>' +
     '<div class="contents" ng-transclude></div>' +
   '</div>',
      replace: false
    };
  }).
  directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
	   '<div ng-show="selected" ng-transclude>' +
       '</div>',
      replace: false
    };
  });

// angular.module('tabs', []).
//   directive('tabs', function() {
//     return {
//       restrict: 'E',
//       transclude: true,
//       scope: {},
//       controller: function($scope, $element) {
//         var panes = $scope.panes = [];
//  
//         $scope.select = function(pane) {
//           panes.forEach(function(pane, i) {
//             pane.selected = false;
//           });
//           pane.selected = true;
//         }
//  
//         this.addPane = function(pane) {
//           if (panes.length == 0) $scope.select(pane);
//           panes.push(pane);
//         }
//       },
//       template:
//         '<div id="container">' +
//           '<div class="tab-strip">' +
//             '<aside>Angular Component</aside>' + 
//             '<div class="tab-wrapper">' +
//               '<h2 ng-repeat="pane in panes" ng-click="select(pane)" ng-class="{active:pane.selected}">{{pane.title}}</h2>' +
//             '</div>' +
//           '</div>' +
//           '<div class="contents" ng-transclude></div>' +
//         '</div>',
//       replace: true
//     };
//   }).
//   directive('pane', function() {
//     return {
//       require: '^tabs',
//       restrict: 'E',
//       transclude: true,
//       scope: { title: 'bind' },
//       link: function(scope, element, attrs, tabsCtrl) {
//         tabsCtrl.addPane(scope);
//       },
//       template:
//         '<div ng-show="selected" ng-transclude>' +
//         '</div>',
//       replace: true
//     };
//   });
