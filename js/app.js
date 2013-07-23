requirejs.config({
	"baseUrl": "js/lib",
	"paths": {
		"app": "../app",
		"jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min"
	}
});

requirejs(["app/main"]);