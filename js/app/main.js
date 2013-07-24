require(["jquery", "lodash"], function($, _) {
	$(function() {
		console.info("Success!");

		var context = new webkitAudioContext();

		require(['app/oscillator'], function(oscillator) {
			// function oscillate() {
			// 	var val = ((Math.sin(+new Date() / 100) + 1) / 2 * 1540 + 220);
			// 	console.info(val);
			// 	osc0.updateFrequency(val);

			// 	setTimeout(oscillate, 100);
			// }

			var osc0 = new oscillator({ context: context, waveform: 'triangle', gain: 0.1 });
			var osc1 = new oscillator({ context: context, waveform: 'triangle', gain: 0.1 });
			osc0.start();
			// osc0.render();

			// oscillate();
		});
	});
});