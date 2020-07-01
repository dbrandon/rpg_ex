'use strict';

rpgApp.factory('MobFactory', function() {
  var factory = {};

  function Mob() {
    this.health = 25;
  }

  return factory;
})