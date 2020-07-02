'use strict';

var rpgApp = angular.module('rpgApp', []);

rpgApp.controller('mainController', function($scope, ItemFactory, ConsoleService, MobFactory, RpgService) {

  RpgService.onSystemLoaded().then(function() {
    $scope.mob = MobFactory.createRandomMob();
    $scope.weapon = ItemFactory.createRandomItem();

    ConsoleService.combat('Starting RPG system...');
    ConsoleService.combat([
      ConsoleService.text('You start with'), $scope.weapon.toLogMessage()
    ])
    ConsoleService.combat('You see a ' + $scope.mob.name);
  });

  $scope.handleAttack = function(which) {
    if($scope.mob.isAlive()) {
      var result = $scope.weapon.getAttackResult();

      if (result.damage == 0) {
        ConsoleService.combat(result.note, ConsoleService.TEXT_RED);
      }
      else {
        var msgs = [];
        if(result.note) {
          msgs.push(ConsoleService.text(result.note, ConsoleService.TEXT_ITALIC));
        }
        msgs.push(ConsoleService.text('Hit ' + $scope.mob.name + ' for ' + result.damage + ' damage'));
        ConsoleService.combat(msgs);
      }

      $scope.mob.takeDamage(result.damage);
      if(!$scope.mob.isAlive()) {
        ConsoleService.combat($scope.mob.name + ' defeated!', ConsoleService.TEXT_ITALIC);
      }
    }
    else {
      ConsoleService.combat($scope.mob.name + ' is already dead!', ConsoleService.TEXT_RED)
    }
  }

  $scope.spawnMob = function() {
    $scope.mob = MobFactory.createRandomMob();
    ConsoleService.combat('New ' + $scope.mob.name + ' spawned!')
  }
});

