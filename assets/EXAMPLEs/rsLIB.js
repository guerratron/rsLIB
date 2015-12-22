/*
 * File autoLoader for javascript Libraries (multi-scripts). 
 * copyright @ 2015 - Juan José Guerra Haba <dinertron@gmail.com>
 * License: Free. GPL.v3
 * 
 * 'rsLIB' o RSLIB is an acronym for 'require async library' and a scripts library autoloader. It loads Scripts (js, json, ...) and 
 * even style sheets (CSS). Returns a 'rsLIB' object with a 'onComplete (..)' event to pass a callback function. You only need to use 
 * it if you do use a resource immediately (variable, method, object ...) from library.
 * An options object embedded within the label 'script' call to this charger is expected with the terms:
 *  - NameLIB: name of the library to load
 *  - PathToLIB: path (relative or absolute) to the library directory with respect to html caller.
 *  - Scripts: An array with the path relative to each script file you want to load. The last element of the array will not be 
 *    charged, which is only indicates the main on which to launch the 'onComplete (..)' method.
 * The call in the HTML Head might be:
 * <script id="rsLIB_ID" class="rsLIB_CLASS" type="text/javascript" src="./scripts/rsLIB.js">
 * 	{
 * 		nameLIB:   "PolyArea",
 * 		pathToLIB: "./scripts/PolyArea/",
 * 		scripts:   ["./scripts/PolyArea/PolyArea.js",
 * 				    "./scripts/PolyArea/css/polyArea.css",
 * 				    "./scripts/PolyArea/PolyArea.js"]	//The latter will not be charged, only determines the event 'onComplete (..)'
 *  }
 * </script>
 * OOP Filosofy and Closures, ECMASCRIPT-6 features such as "use-strict"
 * IMPROVEMENTS: Although it uses internally 'eval' in a controlled manner on these updates will be studied how to replace 'eval' 
 * to 'JSON.parse' or 'JSON.stringify'
 */

/** ASYNC REQUIRE LIBRARY :: INSERT THE LINKED-SCRIPTS PARAMETERS IN THE HEAD SYNCHRONOUSLY, BUT WITHOUT AJAX.
 * It create a loader object (global 'rsLIB' variable ) with an anonymous loader function and as members:
 * - Options: the  complete object detected as embedded options.
 * - LIB name: name of the library to load.
 * - PathToLIB: the path to the library, based on the situation of HTML caller.
 * - Scripts: the array of scripts to load the library.
 * - Get: get properties of embedded object.
 * - Isset: utility method to check whether a variable is undefined.
 * - OnComplete (..): The method that can be passed a callback 'function as the only parameter.
 * Import dynamically (albeit unorthodox) the all library 'assets' , it inserting  (if not previously existed) after 
 * the label linked with this file (rsLIB.js) in the 'head'.  It work synchronously, that is, they must wait until 
 * they are loaded and interpreted to use them immediately.
 * If so required (immediately) because some variable or function defined in scripts is used, * should work within 
 * the event 'onComplete ()' through a function callback ', for example:
 *   rsLIB.onComplete( function(){
 *       //code to execute when the scripts are loaded.
 *   } );
 */
var rsLIB = (function(){
	"use-strict";
	//Configurable static variables (SEMI-CONSTANT). It affects to elements IDs and classes, and labels DOM scripts 
	var RSLIB_NAME = "rsLIB";
	var RSLIB_FILE = RSLIB_NAME + ".js";
	var RSLIB_ID = RSLIB_NAME + "_ID";
	var RSLIB_CLASS = RSLIB_NAME + "_CLASS";
	//variables and methods inner private
	/** An options object embedded within the label 'script' call to this charger is expected with the terms:
 *  - NameLIB: name of the library to load
 *  - PathToLIB: path (relative or absolute) to the library directory with respect to html caller.
 *  - Scripts: An array with the path relative to each script file you want to load. The last element of the array will not be 
 *    charged, which is only indicates the main on which to launch the 'onComplete (..)' method. */
	var _options = eval("("+RSLIB_getThisScript().innerHTML+")");	//ATENCIÓN: DEBE SER UN OBJETO O NO SURTIRÁ EFECTO
	//var _options = JSON.parse((RSLIB_getThisScript().innerHTML));//JSON.stringify
	/** External function in the 'onComplete' event to host the code that need immediacy and well make sure the scripts are loaded. */
	var _callback=null;
	/** It is the couple of callback, depending on the state of the callback is _ready or do not. This is achieved with no gap between 
	  * the charging phase of script and execution callback. */
	var _ready=false;
	/** Event employee for pass an external callback function to be executed upon completion of the loaded library.
	  * This can be useful if, for example, you want to immediately use a resource (variable, object, method, ...)
		* defined in the library. This should be done within the 'callback' function as incorporating the various scripts 
		* in Head of a synchronous load page 'modifies the flow execution javascript ' occurs due to the DOM modification,  
		* it can (depending on the browser) run the last library scripts. */
	function RSLIB_onComplete(callback){
		/* ... Include here  the event or use externally as a callback() function; ... */
		_callback = callback;
		if(_ready){ _callback(); }
	}
	
	/** Public utility function to check if there is a variable, if it has been defined. You must pass the 'typeof' of the
    * Variable, not the variable itself. For example: alert (RSLIB.requireIsset (typeof unknown_variable)); */
	function RSLIB_isset(typeOfvar){ return (typeOfvar.toUpperCase() !== "UNDEFINED"); }
	/** Utility function to get object properties of embedded options. */
	function RSLIB_get(prop, defaultValue){
		return (_options && _options[prop]) ? _options[prop] : defaultValue;
	}
	/** Internal utility function to take as NODE object, this script file; */
	function RSLIB_getThisScript(){
		//DETECT THIS FILE (rsLIB.js) AS A SCRIPT-NODE LINKED IN THE HEAD
		//FIRST THINGS LOOK FOR YOUR ID
		var requireScript=document.getElementById(RSLIB_ID);
		if(requireScript){ return requireScript; }
		//IF NOT FOUND, LOOK FOR HIS CLASS
		var requireHead = (document.head || document.documentElement || document.getElementsByTagName("head")[0] || document.querySelector("head"));
		var requireScripts = requireHead.getElementsByTagName("script");
		var requireScript;
		for(var i=0; i<requireScripts.length; i++){
			if( requireScripts[i].className === RSLIB_CLASS ){ 
				requireScript=requireScripts[i];
				break;
			}
		}
		if(requireScript){ return requireScript; }
		//IF NOT FOUND, LOOKING FOR HIS FILE NAME
		for(var i=0; i<requireScripts.length; i++){
			if( requireScripts[i].src.indexOf(RSLIB_FILE) > -1 ){ 
				requireScript=requireScripts[i];
				break;
			}
		}
		return requireScript;
	}
	
	//DYNAMIC LOAD FOR HEAD-HTML SCRIPTS. THE DETECTED OPTIONS IN SCRIPT-NODE CALLER FOR THIS FILE
	(function RSLIB_loadSyncScripts (options){
		//IT CHECKS BASIC OPTIONS AND IT ASSIGNS DEFAULT PROPERTY (IF NOT FOUND)
		options["scripts"]=RSLIB_get("scripts", []);
		options["nameLIB"]=RSLIB_get("nameLIB", "");
		options["pathToLIB"]=RSLIB_get("pathToLIB", "./");
		 //THE LAST ELEMENT DOES NOT LOAD, BUT IT DEFINED IN 'onComplete()' EVENT.
		var _scriptCompleted = options.scripts.pop();
		options.scripts = options.scripts.reverse(); //THE LAST SHALL BE FIRST IN THE KINGDOM OF GOD
		//FOR EACH SCRIPT
		for(var i=0; i<options.scripts.length; i++){
			if(!options.scripts[i]) { continue; }
			var tipo= options.scripts[i].split(".").pop();
			var nombreExt= (options.scripts[i].indexOf("\\")>-1) ? options.scripts[i].split("\\").pop() : options.scripts[i].split("/").pop();
			nombreExt = nombreExt.replace("\\", "-").replace("/", "-");
			//BUILD SCRIPT
			var nodoScript;
			switch(tipo.toLowerCase()){
				case "css":
					nodoScript = document.createElement("link");
					nodoScript.setAttribute("type", "text/css"); //setAttribute("type", "text/css");
					nodoScript.setAttribute("rel", "stylesheet");
					nodoScript.setAttribute("media", "screen");
					nodoScript.setAttribute("href", options.scripts[i]);
					break;
				case "js": default:	//also "json"
					nodoScript = document.createElement("script");
					nodoScript.setAttribute("type", "text/javascript");
					nodoScript.setAttribute("src", options.scripts[i]);
			}
			nodoScript.setAttribute("id", nombreExt);
			nodoScript.setAttribute("class", RSLIB_NAME + "_" + options.nameLIB);
			if(options.scripts[i] === _scriptCompleted){
				if (nodoScript.readyState) { // IE
					nodoScript.onreadystatechange = function () {
				      if (nodoScript.readyState === 'loaded' || nodoScript.readyState === 'complete') {
				    	  nodoScript.onreadystatechange = null;
				    	  if(_callback){ 
					    	  _callback();  //onComplete();
					      } else {
					    	  _ready=true;
					      }
				      }
				    };
				} else { // Others
					nodoScript.onload = function() {
				      if(_callback){ 
				    	  _callback();  //onComplete();
				      } else {
				    	  _ready=true;
				      }
				    };
				}
			}
			//THIS FILE IS DETECTED (zLIB.js) AS A SCRIPT-NODE LINKED IN SECTION HTML-HEAD
			var requireHead = (document.head || document.documentElement || document.getElementsByTagName("head")[0] || document.querySelector("head"));
			var requireScripts = requireHead.getElementsByTagName("script");
			var requireScript;
			var insertar = true;
			for(var j=0; j<requireScripts.length; j++){
				if(requireScripts[j].src === options.scripts[i]) {
					insertar = false;
					break;
				}
				if( (requireScripts[j].id === RSLIB_ID) || (requireScripts[j].className === RSLIB_CLASS) || (requireScripts[j].src.indexOf(RSLIB_FILE) > -1) ){ 
					requireScript=requireScripts[j];
					//break;
				}
			}
			//IT IS INSERTED (if not previously existed) AFTER THIS LINKED FILE (rsLIB.js) IN THE SECTION HTML-HEAD
			if(insertar) { requireHead.insertBefore(nodoScript, requireScript.nextSibling); }
		}
		 //IS REPOSITIONED AS THEY WERE
		options.scripts = options.scripts.reverse();
		//IT MAKES TRAILS DELETED FOR ALL CONFIGURATION OPTIONS
		RSLIB_getThisScript().innerHTML="";
	})(_options);
	
	//PUBLIC API
	return {
		/** It is an options object embedded within the label 'script' call to this charger is expected with the terms:
		 *  - NameLIB: name of the library to load
		 *  - PathToLIB: path (relative or absolute) to the library directory with respect to html caller.
		 *  - Scripts: An array with the path relative to each script file you want to load. The last element of the array will not be 
		 *    charged, which is only indicates the main on which to launch the 'onComplete (..)' method. */
		options: _options,
		/** Name of the library to load */
		nameLIB: RSLIB_get("nameLIB", ""),
		/** Path to the library directory with respect to html caller. */
		pathToLIB: RSLIB_get("pathToLIB", "./"),
		/** Scripts to dynamic load for the loader function. They should contain the relative path.
		 * WARNING: THE LAST ELEMENT NOT BE CHARGED, WHICH IS ONLY INDICATES THE MAIN ON WHICH TO LAUNCH THE 'onComplete(..)' EVENT. */
		scripts: RSLIB_get("scripts", []),
		/** Utility function to get a property of embedded options object. */
		get: RSLIB_get,
		/** Public utility function to check if there is a variable, if it has been defined. You must pass the 'typeof' of the
    * Variable, not the variable itself. For example: alert (RSLIB.requireIsset (typeof unknown_variable)); */
		isset : RSLIB_isset,
		/** Event employee for pass an external callback function to be executed upon completion of the loaded library.
	  * This can be useful if, for example, you want to immediately use a resource (variable, object, method, ...)
		* defined in the library. This should be done within the 'callback' function as incorporating the various scripts 
		* in Head of a synchronous load page 'modifies the flow execution javascript ' occurs due to the DOM modification,  
		* it can (depending on the browser) run the last library scripts. */
		onComplete: RSLIB_onComplete
	}
})();

//document.normalize();