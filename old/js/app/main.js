require(["jquery", "lodash"], function($, _) {
	$(function() {
		console.info("Success!");

		var context = new webkitAudioContext();

		require(['controllers/oscillator', 'models/oscillator'], function(oscillatorController, oscillatorModel) {
			for (var i = 0; i < 4; ++i) {
				var model = new oscillatorModel({ frequency: 440 + ((i-2) * 4), waveform: 'sine' });
				var oscController = new oscillatorController({ model: model, container: $('#nodes'), context: context });
			}
		});

		console.info(context);
	});
});