/*jslint node: true, todo: true*/
'use strict';
//TODO: standardize how we use module.exports
//TODO: dependency injection - only what we need
module.exports = function AccountLdapAdapter(config) {
  var
  //TODO: strategy should not be hard-coded
    LdapStrategy = require('passport-ldapauth');

//@TODO: Use AccountLdapAdapter.prototype
  this.getStrategy = function () {
    var
      OPTS = {
        server: {
          url: config.url,
          bindDn: config.bindDn,
          bindCredentials: config.bindCredentials,
          searchBase: config.searchBase,
          usernameField: config.usernameField,
          passwordField: config.passwordField,
          searchFilter: config.searchFilter
        }
      };
    return new LdapStrategy(OPTS);
  };
//@TODO: Use AccountLdapAdapter.prototype
  this.getStrategyName = function () {
    return 'ldapauth';
  };
//@TODO: Use AccountLdapAdapter.prototype
  this.serializeUser = function (user, done) {
    user.name = user.cn;
    user.id = user.cn;
    done(null, user);
  };
//@TODO: Use AccountLdapAdapter.prototype
  this.deserializeUser = function (user, done) {
    done(null, user);
  };
};
