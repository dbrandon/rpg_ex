'use strict';

rpgApp.factory('ItemFactory', function (ConsoleService) {
  var factory = {};

  factory.GARBAGE =  {rarity: 'GARBAGE', css: ConsoleService.TEXT_LINK_GRAY }
  factory.COMMON = {rarity: 'COMMON', css: ConsoleService.TEXT_LINK_WHITE }
  factory.UNCOMMON = {rarity: 'UNCOMMON', css: ConsoleService.TEXT_LINK_GREEN }
  factory.RARE = {rarity: 'RARE', css: ConsoleService.TEXT_LINK_BLUE }
  factory.EPIC = {rarity: 'EPIC', css: ConsoleService.TEXT_LINK_PURPLE }

  function Item(name, description, rarity, damageMin, damageMax) {
    this.name = name;
    this.description = description || 'generic item';
    this.rarity = rarity || factory.GARBAGE;
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
      css: this.rarity.css,
      'linkinfo': {
        description: this.description
      }
    }
  }

  factory.Item = Item;

  factory.createRandomItem = function () {
    var db = [
      new Item('Broken Branch', 'This was found littering the walkway but might hurt', factory.GARBAGE, 1, 1),
      new Item('Claw Hammer', 'This can be used in carpentry', factory.COMMON, 1, 2),
      new Item('Dagger of Slashing', 'This dagger is crafted with...', factory.UNCOMMON, 1, 3),
      new Item('Hammer of Power', 'Devastating weapon that does', factory.RARE, 4, 7),
      new Item('Bow of Vanquishing', 'Unstoppable deadly bow', factory.EPIC, 5, 24)
    ]

    return db[Math.floor(Math.random() * db.length)]
  }

  return factory;
})
