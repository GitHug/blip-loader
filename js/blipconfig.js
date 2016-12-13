
(function() {
  "use strict";

  /**
   * Configuration for a BlipConfig.
   * @typedef {Object} BlipConfig
   * @property {string} colorOn - A hexadecimal color code that is used when a blip is active.
   * @property {string} colorOff - A hexadecimal color code that is used when a blip is inactive.
   */
  exports.config = function() {
    return config;
  }

  /**
   * Default configuration
   */
  var config = {
    colorOn: '#C63D0F',
    colorOff: '#FDF3E7',
    size: '400'
  };
})();
