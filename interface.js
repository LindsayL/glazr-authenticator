/*jslint node: true, nomen:true*/

(function () {
  'use strict';

  var
  /* Must use a scope variable rather than this.adapter as a parameter of
   the AccountApiInterface object because for some reason 'this' becomes
   undefined.
   */
    adapter,
    Authenticator;

  /**
   * Constructor for Authenticator
   * @class {Object} Authenticator
   * @param {Object} options - The config for Account. Example:
   * {
   *  type: "LocalFile",
   *  config: {
   *    accountTablePath: ""
   *  }
   * }
   * OR
   * {
   *  type: "Ldap",
   *  config: {
   *    "url": "ldap://10.50.1.10:389",
   *    "bindDn": "CN=admin,DC=glazr,DC=ca",
   *    "bindCredentials": "Inject1",
   *    "searchBase": "ou=people,ou=Glazr2Test,dc=glazr,dc=ca",
   *    "usernameField": "cn",
   *    "passwordField": "userPassword",
   *    "searchFilter": "(cn={{username}})"
   *  }
   * }
   */
  Authenticator = function (options) {
    adapter = this.getAdapter(options);
  };

  /**
   * Initializes the adapter that will be used.
   * @param {object} options
   * @returns {object} The initialized adapter.
   */
  Authenticator.prototype.getAdapter = function (options) {
    if (!options) {
      throw new Error("Authenticator initialization: Missing options (see readme)");
    }
    if (!options.type) {
      throw new Error("Authenticator initialization: Missing options.type (see readme)");
    }
    if (!options.config) {
      throw new Error("Authenticator initialization: Missing options.config (see readme)");
    }

    var
      adapterPath;

    switch (options.type) {
      case 'LocalFile':
        adapterPath = 'LocalFile';
        break;
      case 'Ldap':
        adapterPath = 'Ldap';
        break;
      default:
        throw new Error("Persistor initialization: Invalid options.type (see readme)");
    }
    return new (require('../adapters/' + adapterPath))(options.config);
  };

  /**
   * Return the instantiated authorization strategy
   * @type {Function}
   * @returns {Object} - instantiated strategy
   */
  Authenticator.prototype.getStrategy = function () {
    return adapter.getStrategy();
  };

  /**
   * Returns the name of the implemented strategy
   * @type {Function}
   * @returns {String} - name of the current authentication strategy.
   */
  Authenticator.prototype.getStrategyName = function () {
    return adapter.getStrategyName();
  };

  /**
   * Asynchronously serializes user (adds fields to the user object) and calls
   * done callback.  The fields include:
   * id: The unique identifier for the user.
   * name: A nickname for the user, what should be displayed back to the user.
   * @type {Function}
   * @param {Object} user
   * @param {Function} done
   * @returns undefined
   */
  Authenticator.prototype.serializeUser = function (user, done) {
    return adapter.serializeUser(user, done);
  };

  /**
   * Asynchronously deserializes user object and calls done callback
   * @type {Function}
   * @param {Object} user
   * @param {Function} done
   * @returns undefined
   */
  Authenticator.prototype.deserializeUser = function (user, done) {
    return adapter.deserializeUser(user, done);
  };

  module.exports = Authenticator;
}());
