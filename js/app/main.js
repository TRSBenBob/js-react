require(["jquery", "lodash"], function($, _) {
	$(function() {
		console.info("Success!");

		var context = new webkitAudioContext();

		require(['controllers/oscillator', 'models/oscillator'], function(oscillatorController, oscillatorModel) {
			var oscModel = new oscillatorModel();
			var oscController = new oscillatorController({ model: oscModel, container: $('#nodes'), context: context });
		});
	});
});