'use strict';

var rpgApp = angular.module('rpgApp', []);

rpgApp.controller('mainController', function($scope, ItemFactory, ConsoleService) {
  $scope.mainConsole = document.getElementById('main-console');

  $scope.label = "my label";
  $scope.health = 25;
  $scope.weapon = ItemFactory.createRandomItem();

  ConsoleService.combat('Starting RPG system...');
  ConsoleService.combat([
    ConsoleService.text('You start with'), $scope.weapon.toLogMessage()
  ])

  $scope.handleAttack = function(which) {
    if($scope.health > 0) {
      var result = $scope.weapon.getAttackResult();

      if (result.damage == 0) {
        ConsoleService.combat(result.note, ConsoleService.TEXT_RED);
      }
      else {
        var msgs = [];
        if(result.note) {
          msgs.push(ConsoleService.text(result.note, ConsoleService.TEXT_ITALIC));
        }
        msgs.push(ConsoleService.text('Hit for ' + result.damage + ' damage'));
        ConsoleService.combat(msgs);
      }

      $scope.health -= result.damage;
      if($scope.health <= 0) {
        $scope.health = 0;
        ConsoleService.combat('Mob defeated!', ConsoleService.TEXT_ITALIC);
      }
    }
    else {
      ConsoleService.combat('Mob is already dead!', ConsoleService.TEXT_RED)
    }
  }

  $scope.spawnMob = function() {
    $scope.health = 25;
    ConsoleService.combat('New mob at full health spawned!')
  }
});

