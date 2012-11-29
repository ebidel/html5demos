/**
 * @constructor
 */
function AudioController() {
  /**
   * @type {?AudioBuffer}
   * @private
   */
  this.audioBuffer_ = null;

  /**
   * @type {?AudioBufferSourceNode}
   * @private
   */
  this.source_ = null;

  /**
   * @type {?AudioContext}
   * @private
   */
  this.audioContext_ = null;

  /**
   * @type {boolean}
   */
  this.loaded = false;
}

/**
 * @type {boolean}
 */
AudioController.prototype.isSupported = 'AudioContext' in window ||
                                        'webkitAudioContext' in window;

/**
 * Loads an audio file by URL for play later.
 *
 * @param {string} url The audio file to load.
 * @param {Function=} opt_callback Optional callback when file is fully loaded.
 */
AudioController.prototype.load = function(url, opt_callback) {
  if (this.isSupported) {
    this.audioContext_ = new window.webkitAudioContext();
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';

  var that = this;
  xhr.onload = function(e) {
    that.audioContext_.decodeAudioData(this.response, function(buffer) {
      that.audioBuffer_ = buffer;
      that.loaded = true;
      if (opt_callback) {
        opt_callback();
      }
    });
  }
  xhr.send();
};

/**
 * Plays the audio buffer.
 *
 * @param {number=} opt_gain Optional gain value to set the volume.
 */
AudioController.prototype.play = function(opt_gain) {
  if (this.isSupported && this.loaded && this.audioBuffer_) {
    this.source_ = this.audioContext_.createBufferSource();
    this.source_.buffer = this.audioBuffer_;

    var gainNode = this.audioContext_.createGainNode();
    gainNode.gain.value = opt_gain || 1.0;
    this.source_.connect(gainNode);
    gainNode.connect(this.audioContext_.destination);

    this.source_.noteOn(0);
  }
};

/**
 * Stops playing audio.
 */
AudioController.prototype.stop = function() {
  if (this.source_) {
    this.source_.noteOff(0);
  }
};
