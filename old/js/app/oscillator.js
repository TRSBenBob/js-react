define('app/oscillator', ['jquery', 'lodash', 'text!views/oscillator.html!strip'], function($, _, view) {
	var defaults = {
		waveforms: ['sine', 'triangle', 'square', 'sawtooth'],
		waveform: 'sine',
		frequency: 440,
		gain: 1,
		paused: true,
		_view: view,
		_$container: $('#nodes')
	};

	function Oscillator(options) {
		_.extend(this, defaults, options || {});

		this.init();
		this.databind();
	}

	_.extend(Oscillator.prototype, {
		init: function() {
			this._id = _.uniqueId('oscillator_');

			// generate template view
			this._view = _.template(this._view);

			// create audio nodes
			this.gainNode = this.context.createGain();
			this.oscNode = this.context.createOscillator();

			// chain nodes to context
			this.oscNode.connect(this.gainNode);
			this.gainNode.connect(this.context.destination);

			// set gain/freq/waveform based on own values
			this.update();

			// add the view to the DOM
			this._$el = $('<div />').addClass("oscillator").attr('id', this._id);
			this._$container.append(this._$el);
			
			this.render();

			// now play the waveform!
			this.oscNode.start(0);

			return this;
		},
		databind: function() {
			var that = this;
			this._$el.on('change', '[data-control]', function(ev) {
				var controlName = ev.target.dataset.control;

				var value = null;
				switch (this.type) {
					case "checkbox":
						value = this.checked;
						break;
					default:
						value = this.value;
						break;
				}

				that[controlName] = value;
				that.update();
			});
		},
		dataOnly: function() {
			return _.pick(this, function(value, key) {
				return key.charAt(0) != '_' && !_.isFunction(value);
			});
		},
		render: function() {
			if (this._$el)
				this._$el.html(this._view(this.dataOnly()));
		},
		update: function() {
			this.updateGain(this.gain, false);
			this.updateFrequency(this.frequency, false);
			this.updateWaveform(this.waveform, false);

			// this.render();

			console.info(this);
		},
		updateGain: function(gain, render) {
			if (typeof gain !== "undefined") {
				this.gain = Math.max(Math.min(gain, 1), 0);
			}

			this.gainNode.gain.value = this.paused ? 0 : this.gain;

			if (render !== false)
				this.render();
		},
		updateFrequency: function(freq, render) {
			if (typeof freq !== "undefined") {
				this.frequency = freq;
			}

			this.oscNode.frequency.value = this.frequency;

			if (render !== false)
				this.render();
		},
		updateWaveform: function(waveform, render) {
			if (typeof waveform !== "undefined") {
				this.waveform = _.indexOf(this.waveforms, waveform) > -1 ? waveform : this.waveforms[0];
			}

			this.oscNode.type = this.waveform;

			if (render !== false)
				this.render();
		},
		start: function() {
			this.paused = false;
			this.updateGain();

			this.render();
		},
		stop: function() {
			this.paused = true;
			this.updateGain();

			this.render();
		},
		toggle: function() {
			this.paused = !this.paused;
			this.updateGain();

			this.render();
		}
	});

	return Oscillator;
});