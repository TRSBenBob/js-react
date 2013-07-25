define('controllers/oscillator', ['jquery', 'lodash', 'ractive', 'text!views/oscillator.html!strip'], function($, _, Ractive, template) {
	function OscillatorController(options) {
		_.extend(this, options || {});

		this.init();
	}

	_.extend(OscillatorController.prototype, {
		init: function() {
			this.id = _.uniqueId('oscillatorController_');

			// generate template view
			this.view = new Ractive({
				el: $('<div />').addClass('oscillator'),
				template: template,
				data: this.model
			});

			this.container.append(this.view.el);

			this.view.observe({
				'frequency': _.bind(function(newVal, oldVal) {
					this.oscNode.frequency.value = newVal;
				}, this),
				'gain': _.bind(function(newVal, oldVal) {
					this.gainNode.gain.value = this.model.paused ? 0 : newVal;
				}, this),
				'waveform': _.bind(function(newVal, oldVal) {
					this.oscNode.type = newVal;
				}, this),
				'paused': _.bind(function(newVal, oldVal) {
					this.gainNode.gain.value = newVal ? 0 : this.model.gain;
				}, this)
			});

			// create audio nodes
			this.gainNode = this.context.createGain();
			this.oscNode = this.context.createOscillator();

			// chain nodes to context
			this.oscNode.connect(this.gainNode);
			this.gainNode.connect(this.context.destination);

			this.oscNode.start(0);
		}
	});

	return OscillatorController;
});