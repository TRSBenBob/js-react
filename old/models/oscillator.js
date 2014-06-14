define('models/oscillator', ['lodash'], function(_) {
	var waveforms = ['sine', 'triangle', 'square', 'sawtooth'];

	var defaults = {
		waveforms: waveforms,
		waveform: waveforms[0],
		frequency: 440,
		gain: 0.5,
		paused: false
	};

	function OscillatorModel(options) {
		this.id = _.uniqueId('oscillatorModel_');

		_.extend(this, defaults, options || {});
	};

	return OscillatorModel; 
});