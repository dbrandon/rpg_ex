'use strict';

rpgApp.factory('ConsoleService', function () {
  var factory = {};

  function Message(parts) {
    var now = new Date();
    /** @type {Date} */
    this.time = now;
    this.parts = parts;
    this.timeString = sprintf('%02d:%02d:%02d', now.getHours(), now.getMinutes(), now.getSeconds());
  }

  factory.Message = Message;

  function MessageList() {
    this.msgList = [];
    this.listeners = [];
  }

  MessageList.prototype.addMessage = function (message) {
    this.msgList.push(message);
    // while (this.msgList.length > 5) {
    //   this.msgList.shift();
    // }
    this.listeners.forEach(function (callback) {
      callback();
    });
  }

  MessageList.prototype.addMessageListener = function (callback) {
    this.listeners.push(callback);
  }

  factory.MessageList = MessageList;

  factory.TEXT_NORMAL = 'combat-text-normal';
  factory.TEXT_RED = 'combat-text-red';
  factory.TEXT_BLUE = 'combat-text-blue';

  factory.TEXT_ITALIC = 'combat-text-italic';

  factory.TEXT_LINK_GREEN = 'combat-text-link-green';
  factory.TEXT_LINK_BLUE = 'combat-text-link-blue';
  factory.TEXT_LINK_PURPLE = 'combat-text-link-purple';

  var associations = {};
  var backlog = {};

  factory.registerConsole = function(name, impl) {
    associations[name] = impl;
    if(backlog[name]) {
      backlog[name].forEach(function(arg) {
        impl(factory.process(arg));
      });
      delete backlog[name];
    }
  }

  function logToConsole(name, arg) {
    if(associations[name]) {
      associations[name](factory.process(arg));
    }
    else {
      if(backlog[name] == null) {
        backlog[name] = []
      }
      backlog[name].push(arg);
    }
  }

  factory.combat = function(arg) {
    logToConsole('combat', factory.process.apply(null, arguments));
  }

  factory.process = function(arg) {
    var msg;

    if (arguments.length == 1) {
      if (typeof arg === 'string') {
        msg = new Message(
          msgParts = [{ text: arg, css: factory.TEXT_NORMAL }]);
      }
      else if (Array.isArray(arg)) {
        msg = new Message(arg);
      }
      else {
        msg = arg;
      }
    }
    else {
      var msgParts = [];
      for (var i = 0; i < arguments.length; i += 2) {
        msgParts.push({ text: arguments[i], css: arguments[i + 1] });
      }
      msg = new Message(msgParts);
    }

    return msg;
  }

  factory.text = function (message, css) {
    return {
      text: message,
      css: css
    }
  }

  return factory;
})
