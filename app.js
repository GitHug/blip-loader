"use strict";

var blipLoader = require('./js/bliploader');
var jQuery = require('jQuery');

require('domready')(function () {
  jQuery(blipLoader.init());
})

module.exports = function() {
  //jQuery(blipLoader.init());
}

/**
 * Changes the default configuration for blip-clock
 *
 * @param {BlipConfig} [newConfig] - Optional {@link BlipConfig} that can modify
 * the default configuration. It does not have to include all properties.
 * @return {BlipConfig} - The currently active configuration for blip-clock.
 * If no newConfig has been supplied then it returns the default configuration.
 */
module.exports.config = function(newConfig) {
  return blipConfig.config(newConfig);
}
