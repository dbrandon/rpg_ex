'use strict';

var placeholderApp = angular.module('placeholderApp', []);

placeholderApp.directive('damageConsole', function() {
  return {
    restrict: 'E',
    templateUrl: 'damageConsole.html',
    scope: {},
    controller: function($scope, $element, ItemFactory, LogFactory, $interval) {
      $scope.mainDiv = $element.children()[0];
      $scope.msgList = LogFactory.getCombatMessageList();

      LogFactory.addCombatMessageListener(function() {
        $interval(function() {
          $scope.mainDiv.scrollTop = $scope.mainDiv.scrollHeight;
        }, 10, 1)
      })

      $scope.handleClick = function(part) {
        console.log('clicked on ' + JSON.stringify(part))
      }

      LogFactory.addCombatMessage('System Started!');
    }
  }
});

placeholderApp.controller('mainController', function($scope, ItemFactory, LogFactory) {
  $scope.mainConsole = document.getElementById('main-console');

  $scope.label = "my label";
  $scope.health = 25;

  $scope.weapon = ItemFactory.createRandomItem();
  LogFactory.addCombatMessage([
    LogFactory.text('You start with'), $scope.weapon.toLogMessage()
  ])

  $scope.handleAttack = function(which) {
    if($scope.health > 0) {
      var result = $scope.weapon.getAttackResult();

      if (result.damage == 0) {
        LogFactory.addCombatMessage(result.note, LogFactory.TEXT_RED);
      }
      else {
        var msgs = [];
        if(result.note) {
          msgs.push(LogFactory.text(result.note, LogFactory.TEXT_ITALIC));
        }
        msgs.push(LogFactory.text('Hit for ' + result.damage + ' damage'));
        LogFactory.addCombatMessage(msgs);
      }

      $scope.health -= result.damage;
      if($scope.health <= 0) {
        $scope.health = 0;
        LogFactory.addCombatMessage('Mob defeated!', LogFactory.TEXT_ITALIC);
      }
    }
    else {
      LogFactory.addCombatMessage('Mob is already dead!', LogFactory.TEXT_RED)
    }
  }

  $scope.spawnMob = function() {
    $scope.health = 25;
    LogFactory.addCombatMessage('New mob at full health spawned!')
  }
});

placeholderApp.factory('ItemFactory', function(LogFactory) {
  var factory = {};

  function Item(name, description, css, damageMin, damageMax) {
    this.name = name;
    this.description = description || 'generic item';
    this.css = css || LogFactory.TEXT_LINK_GREEN;
    this.damageMin = damageMin || 3;
    this.damageMax = damageMax || 5;
    this.damageDelta = this.damageMax - this.damageMin + 1;

    this.description += ' (Does ' + this.damageMin + ' to ' + this.damageMax + ' per hit)'
  }

  Item.prototype.getAttackResult = function() {
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

  Item.prototype.toLogMessage = function() {
    return {
      text: '[' + this.name + ']',
      css: this.css,
      'linkinfo': {
        description: this.description
      }
    }
  }

  factory.Item = Item;

  factory.createRandomItem = function() {
    var db = [
      new Item('Dagger of Slashing', 'This dagger is crafted with...', LogFactory.TEXT_LINK_GREEN, 1, 3),
      new Item('Hammer of Power', 'Devastating weapon that does', LogFactory.TEXT_LINK_BLUE, 4, 7),
      new Item('Bow of Vanquishing', 'Unstoppable deadly bow', LogFactory.TEXT_LINK_PURPLE, 5, 24)
    ]

    return db[Math.floor(Math.random() * db.length)]
  }

  return factory;
})

placeholderApp.factory('LogFactory', function() {
  var factory = {};

  function LogMessage(parts) {
    var now = new Date();
    /** @type {Date} */
    this.time = now;
    this.parts = parts;
    this.timeString = sprintf('%02d:%02d:%02d', now.getHours(), now.getMinutes(), now.getSeconds());
  }

  factory.LogMessage = LogMessage;

  function LogMessageList() {
    this.msgList = [];
    this.listeners = [];
  }

  LogMessageList.prototype.addMessage = function(message) {
    this.msgList.push(message);
    // while (this.msgList.length > 5) {
    //   this.msgList.shift();
    // }
    this.listeners.forEach(function(callback) {
      callback();
    });
  }

  LogMessageList.prototype.addMessageListener = function(callback) {
    this.listeners.push(callback);
  }

  var combatList = new LogMessageList();

  factory.TEXT_NORMAL = 'combat-text-normal';
  factory.TEXT_RED = 'combat-text-red';
  factory.TEXT_BLUE = 'combat-text-blue';

  factory.TEXT_ITALIC = 'combat-text-italic';

  factory.TEXT_LINK_GREEN = 'combat-text-link-green';
  factory.TEXT_LINK_BLUE = 'combat-text-link-blue';
  factory.TEXT_LINK_PURPLE = 'combat-text-link-purple';

  factory.addCombatMessage = function(arg) {
    var msg;

    if(arguments.length == 1) {
      if(typeof arg === 'string') {
        msg = new LogMessage(
          msgParts = [{ text: arg, css: factory.TEXT_NORMAL }]);
      }
      else if(Array.isArray(arg)) {
        msg = new LogMessage(arg);
      }
      else {
        msg = arg;
      }
    }
    else {
      var msgParts = [];
      for(var i = 0; i < arguments.length; i+=2) {
        msgParts.push({ text: arguments[i], css: arguments[i+1] });
      }
      msg = new LogMessage(msgParts);
    }

    combatList.addMessage(msg);
  }

  factory.addCombatMessageListener = function(callback) {
    combatList.addMessageListener(callback);
  }
  factory.getCombatMessageList = function() {
    return combatList.msgList;
  }

  factory.text = function(message, css) {
    return {
      text: message,
      css: css
    }
  }

  return factory;
})
