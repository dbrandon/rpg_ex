'use strict';

rpgApp.directive('console', function () {
  return {
    restrict: 'E',
    templateUrl: 'console.html',
    scope: {
      consoleName: '@'
    },
    controller: function ($scope, $element, ConsoleService, $interval) {
      $scope.mainDiv = $element.children()[0];

      $scope.msgList = new ConsoleService.MessageList();
      ConsoleService.registerConsole($scope.consoleName, function(msg) {
        $scope.msgList.addMessage(ConsoleService.process(msg));
      })

      $scope.msgList.addMessageListener(function() {
        $interval(function () {
          $scope.mainDiv.scrollTop = $scope.mainDiv.scrollHeight;
        }, 10, 1)
      })

      $scope.handleClick = function (part) {
        console.log('clicked on ' + JSON.stringify(part))
      }
    }
  }
});

