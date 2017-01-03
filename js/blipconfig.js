
(function() {
  "use strict";

  /**
   * Configuration for a BlipConfig.
   * @typedef {Object} BlipConfig
   * @return {Object} config - Contains configuration properties for the loader
   */
  exports.config = function() {
    return config;
  }

  /**
   * Fixes a bug with the modulo function for negative numbers.
   * @see http://javascript.about.com/od/problemsolving/a/modulobug.htm
   */
  Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
  };

  /**
   * Default configuration
   * @property {Array} colors - Contains color codes for the colors to be shown
   */
  var config = {
    colors: ['#C63D0F', '#0F98C6', '#C60F98', '#0FC63D']
  };
})();
