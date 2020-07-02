'use strict';

rpgApp.factory('MobFactory', function() {
  var factory = {};

  function Mob(name, maxHealth) {
    this.name = name;
    this.health = maxHealth;
  }

  Mob.prototype.isAlive = function() {
    return this.health > 0;
  }

  Mob.prototype.takeDamage = function(damage) {
    this.health -= damage;
    if(this.health < 0) {
      this.health = 0;
    }
  }

  factory.createRandomMob = function() {
    var db = [
      new Mob('Butterfly', 2),
      new Mob('Wild Boar', 25),
      new Mob('Young Brown Drake', 75),
      new Mob('Gold Dragon', 1000)
    ];

    return db[Math.floor(Math.random() * db.length)];
  }

  return factory;
})