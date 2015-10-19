/*jslint node: true, todo: true*/
(function () {
  'use strict';

  var
    fh = require('GlazrFileHelper'),
    LocalAccount,
    scopeConfig;

  LocalAccount = function (config) {
    scopeConfig = config;
    this.strategy = new (require('passport-local').Strategy)(this.authenticate);
  };

  LocalAccount.prototype.authenticate = function (username, password, callback) {
    fh.fileToJson(scopeConfig.accountTablePath, {}, {
      onSuccess: function (accounts) {
        if (accounts[username] === password) {
          callback(null, {
            id: username,
            name: username
          });
        } else {
          callback(null, false, {message: 'failed.'});
        }
      }
    });
  };

  LocalAccount.prototype.getStrategy = function () {
    return this.strategy;
  };

  LocalAccount.prototype.getStrategyName = function () {
    return this.strategy.name;
  };

  LocalAccount.prototype.serializeUser = function (user, done) {
    user.loginId = user.username;
    done(null, user);
  };

  LocalAccount.prototype.deserializeUser = function (user, done) {
    done(null, user);
  };

  module.exports = LocalAccount;
}());
