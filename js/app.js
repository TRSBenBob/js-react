requirejs.config({
	"baseUrl": "js/lib",
	"paths": {
		"app": "../app",
		"models": "../../models",
		"views": "../../views",
		"controllers": "../../controllers",
		"jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min"
	}
});

requirejs(["app/main"]);