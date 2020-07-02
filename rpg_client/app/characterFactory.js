'use strict';

rpgApp.factory('CharacterFactory', function (MobFactory) {
  var factory = {};

  function Character(name, maxHealth) {
    MobFactory.Mob.call(this, name, maxHealth);
  }

  factory.Character = Character;

  return factory;
});
