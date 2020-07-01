'use strict';

rpgApp.factory('RpgService', function () {
  var factory = {};

  var resolveList = [];
  var combatConsoleLoaded = false;

  factory.reportConsoleLoaded = function(name) {
    if(name === 'combat') {
      combatConsoleLoaded = true;
      resolveList.forEach(function(resolve) { resolve(); });
      resolveList = [];
    }
  }

  factory.onSystemLoaded = function() {
    return new Promise(function(resolve, reject) {
      if(combatConsoleLoaded) {
        resolve();
      }
      else {
        resolveList.push(resolve);
      }
    })
  }

  return factory;
});
