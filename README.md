# rsLIB :: REQUIRE SYNC LIBRARY
[![Download rsLIB](https://sourceforge.net/sflogo.php?type=8&group_id=2629568)](https://sourceforge.net/p/rslib-js/)  

[![rslib logo](img/rsLIB_logo.png "rsLIB GitHub page")](http://guerratron.github.io/rsLIB "rsLIB page")
<div id="intro">
<span>rsLIB</span> <sub>REQUIRE SYNC LIBRARY</sub>
	<blockquote>
	It Inserts the linked-scripts parameters in the HTML-HEAD section DYNAMIC and SYNCHRONOUSLY, but without AJAX.  
	It loads Scripts (js, json, ...) and even style sheets (CSS).
	<blockquote>
	<cite><small>AutoLoader File for javascript Libraries (multi-scripts).<br />
	copyright @ 2015 - Juan José Guerra Haba <dinertron@gmail.com> <img id="torotron" src="img/torotron_logo.png" alt="torotron" title="guerraTron" /><br /> 
	License: Free. GPL.v3</small></cite>
	</blockquote>
	</blockquote>
</div>

DESCRIPTION
-----------
'__rsLIB__' o __RSLIB__ is the acronym of 'require async library' and a scripts library autoloader . It loads Scripts (js, json, ...) and even style sheets (CSS) DINAMICALLY and SYNCHRONOUS.  

Return an GLOBAL object '__rsLIB__' for use in an immediate resource (variable, method, object ...) from library. This object contains some interesting properties and methods, among others, a very useful event '*onComplete (..)*' to pass a callback.

You only need to use it if you do use a resource immediately (variable, method, object ...) from library.

OPTIONS
-------
'__rsLIB__' works with options and these are expected as an object embedded within the tag '*script*' of the own call to this charger. These options should appear as follows:
 1. __nameLIB__: name of the library to load
 2. __pathToLIB__: path (relative or absolute) to the library directory with respect to html caller.
 3. __scripts__: An array with the path relative to each script file you want to load. The last element of the array will not be charged, which is only indicates the main on which to launch the 'onComplete (..)' method.

The call in the HTML Head might be:
````html
<script id="rsLIB_ID" class="rsLIB_CLASS" type="text/javascript" src="./scripts/rsLIB.js">
  /* Anonymous object for options  */
	{
		nameLIB:   "PolyArea",
		pathToLIB: "./scripts/PolyArea/",
		scripts:   ["./scripts/PolyArea/PolyArea.js",
						"./scripts/PolyArea/css/polyArea.css",
						"./scripts/PolyArea/PolyArea.js"] //The latter will not be loaded, only determines the event 'onComplete (..)'
  }
</script>
````

The MAGIC here is produced in this way to pass options, on the other hand, the options will be destroyed once used to help increase the SECURITY or ABSTRACTION layer.

FEATURES
--------
 1. OOP Philosophy. 
 2. EcmaScript-6 Features  as "use-strict". 
 3. Abstraction and security through defined Closures and destruction options. 
 4. Simplification and minified code. (just over 2 kilobytes) 
 5. A single file.

ADVANTAGES
----------
The main advantage is obvious, an entire group of scripts to load is implemented in a single options object, avoiding the annoying inclusion line-to-line for each tag in *HTML*, already the loader detect what type of file you are trying LINKAR (*css, js, json*) and generates the corresponding label.

DISADVANTAGES
-------------
 1. Well, the main disadvantage (in some libraries or frameworks is not) is that the burden is necessarily produced in synchronous mode, that is, loading is script-to-script and this implies a possible reduction in execution speed.
 2. Obviously standard tags for all loaded scripts are generated, there is no possibility to particularize with additional attributes. (async, data-main, lang, ...)
 <p class="PD">(P.D.: Some libraries NEED synchronous mode for proper operation)</p>

FUTURE IMPROVEMENTS (TO-DO)
---------------------------
 1. Using AJAX to provide load asynchronously.
 2. Improve and include new options.
 3. Using JSON for options. 
 <p class="PD">P.D.: Although used internally 'eval' on controlled manner, in following updates  it will be studied how to replace 'eval' by 'JSON.parse' or 'JSON.stringify'<p>

CROSS-BROWSER
-------------
(*possibility of some external FOREING effects*)  

Although it has made an effort to charger works cross-browser, DYNAMIC loading is something NO-STANDARD employing an UNORTHODOX way and can cause different behaviors in certain browsers.

<blockquote class="comment">
	<h6>Reasons (tentative explanation):</h6>
	When produced a modification of <b>DOM</b> at the same time it is building its ELEMENT TREE incurred in a kind 
	of contradiction is solved differently in different browsers.  
	I think this occurs because the <i>INTERNAL BROWSERS ARCHITECTURE</i> and type of engine used is very different; 
	It is complicated but has to do with the flow <i>READER-PARSER-INTERPRETATION</i> of files and JavaScript code and 
	<i>CREATION-MODIFICATION</i> DOM tree, and can cause the execution of scripts in a disorderly way (it has been 
	observed in certain versions of <i>IE</i>), even giving different implementation priorities by type of script 
	(script-in-line and linked), which in some cases can cause the browser to proceed with the reading of a piece of 
	code in-line back before another set to a external script that contains the variables used.
</blockquote>

'onComplete( callback )' EVENT
------------------------------
For these reasons the 'cross-browser' section has been implemented 'onComplete (..)' method to wait to use variables which are defined immediately.
To avoid these adverse effects and provide a compatible form for all whatever DIRECT CODE that must run in the CALLBACK function as a parameter. For Example:
````javascript
/** An event callback function which include with immediate code
	* @param callback */
rsLIB.onComplete( function(){
		//code to execute when the scripts are loaded (the main)
});
````

THE 'rsLIB' OBJECT
------------------
Once interpreted the file '_rsLIB.js _', it create the global variable '__rsLIB__' representing the *LOADER* object. The following members is created:
 1. Options: the  complete object detected as embedded options.
 2. LIB name: name of the library to load.
 3. PathToLIB: the path to the library, based on the situation of HTML caller.
 4. Scripts: the array of scripts to load the library.
 5. Get: get properties of embedded object.
 6. Isset: utility method to check whether a variable is undefined.
 7. OnComplete (..): The event method to which can be passed a 'callback' function as the only parameter.
  
	
  --------------------
  
 __AUTHOR__: `I hope I can be of use to someone as it has been for me. In this case it would be appreciated comment use in email or suggestions for future improvements.`
 PLEASE, KEEP CREDIT AND LINKS. THANKS !

 `... And as he said 'George Lucas': that the force be with you. !!`
