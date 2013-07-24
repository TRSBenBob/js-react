define('app/oscillator', ['jquery', 'lodash'], function($, _) {
	var defaults = {
		waveform: 'sine',
		frequency: 440,
		gain: 1,
		paused: true
	};

	function Oscillator(options) {
		_.extend(this, defaults, options || {});

		this.init();
	}

	_.extend(Oscillator.prototype, {
		init: function() {
			// create audio nodes
			this.gainNode = this.context.createGain();
			this.oscNode = this.context.createOscillator();

			// chain nodes to context
			this.oscNode.connect(this.gainNode);
			this.gainNode.connect(this.context.destination);

			// set freq/gain/type based on own values
			this.updateGain();
			this.updateFrequency();
			this.updateWaveform();

			// now play the waveform!
			this.oscNode.start(0);

			return this;
		},
		updateGain: function(gain) {
			if (typeof gain !== "undefined") {
				this.gain = Math.max(Math.min(gain, 1), 0);
			}

			this.gainNode.gain.value = this.paused ? 0 : this.gain;
		},
		updateFrequency: function(freq) {
			if (typeof freq !== "undefined") {
				this.frequency = freq;
			}

			this.oscNode.frequency.value = this.frequency;
		},
		updateWaveform: function(waveform) {
			if (typeof waveform !== "undefined") {
				this.waveform = waveform;
			}

			this.oscNode.type = this.waveform;
		},
		start: function() {
			this.paused = false;
			this.updateGain();
		},
		stop: function() {
			this.paused = true;
			this.updateGain();
		},
		toggle: function() {
			this.paused = !this.paused;
			this.updateGain();
		}
	});

	return Oscillator;
});