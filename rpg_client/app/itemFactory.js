'use strict';

rpgApp.factory('ItemFactory', function (ConsoleService) {
  var factory = {};

  function Item(name, description, css, damageMin, damageMax) {
    this.name = name;
    this.description = description || 'generic item';
    this.css = css || ConsoleService.TEXT_LINK_GREEN;
    this.damageMin = damageMin || 3;
    this.damageMax = damageMax || 5;
    this.damageDelta = this.damageMax - this.damageMin + 1;

    this.description += ' (Does ' + this.damageMin + ' to ' + this.damageMax + ' per hit)'
  }

  Item.prototype.getAttackResult = function () {
    var kind = Math.floor(Math.random() * 10);
    var adjust;
    var note;

    if (kind < 2) {
      adjust = 0;
      note = 'Missed!'
    }
    else if (kind > 7) {
      adjust = 1.5;
      note = 'Critical hit!';
    }
    else {
      adjust = 1;
    }
    var base = this.damageMin + Math.floor(Math.random() * this.damageDelta)
    return {
      damage: Math.floor(adjust * base),
      note: note
    };
  }

  Item.prototype.toLogMessage = function () {
    return {
      text: '[' + this.name + ']',
      css: this.css,
      'linkinfo': {
        description: this.description
      }
    }
  }

  factory.Item = Item;

  factory.createRandomItem = function () {
    var db = [
      new Item('Dagger of Slashing', 'This dagger is crafted with...', ConsoleService.TEXT_LINK_GREEN, 1, 3),
      new Item('Hammer of Power', 'Devastating weapon that does', ConsoleService.TEXT_LINK_BLUE, 4, 7),
      new Item('Bow of Vanquishing', 'Unstoppable deadly bow', ConsoleService.TEXT_LINK_PURPLE, 5, 24)
    ]

    return db[Math.floor(Math.random() * db.length)]
  }

  return factory;
})
