
(function() {
  "use strict";

  /**
   * Configuration for a BlipConfig.
   * @typedef {Object} BlipConfig
   * @property {string} colorOn - A hexadecimal color code that is used when a blip is active.
   * @property {string} colorOff - A hexadecimal color code that is used when a blip is inactive.
   */
  exports.config = function() {

    Number.prototype.mod = function(n) {
      return ((this%n)+n)%n;
    };

    return config;
  }

  /**
   * Default configuration
   */
  var config = {
    colors: ['#C63D0F', '#0F98C6', '#C60F98', '#0FC63D'],
    size: '400'
  };
})();
