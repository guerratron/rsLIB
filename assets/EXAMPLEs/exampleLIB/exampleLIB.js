/** Clase principal de la libería ExampleLIB. Sólo para propósitos de ejemplo y depuración */
var exampleLIB = (function () {
	"use-strict";
	//VARIABLES INTERNAS INVISIBLES DEL CLOSURE //ABSTRACIÓN
	var _TAG = "From 'exampleLIB.js'";
  var _conf = null;
	function getConf(conf){
		_conf=conf;
		return _conf.getTAG();
	}
	//PUBLIC API
	return {
		tag: _TAG,
		conf: getConf
	}
})();
