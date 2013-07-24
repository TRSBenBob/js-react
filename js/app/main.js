require(["jquery", "lodash"], function($, _) {
	$(function() {
		console.info("Success!");

		var context = new webkitAudioContext();

		require(['app/oscillator'], function(oscillator) {
			var osc0 = new oscillator({ waveform: 'triangle', context: context, gain: 0.1, frequency: 440 });
			osc0.start();
		});
	});
});