///////////////////////////////////////////////////////////////////////////////
/*  Author:    C. Egor Kloos - DutchCelt Design */
///////////////////////////////////////////////////////////////////////////////


//  LAZY LOADING ##############################################################

// AMD ROUTING
require.config(
	{   baseUrl: "/scripts/minified",
		paths  : {
			"jquery"    : "jquery",
			"config"    : "config",
			"keepinview": "keepinview",
			"moment"    : "moment",
			"dater"     : "dater",
			"modules"   : "modules"
		}
	}
);

//  Initiate the namespace for Front-end Patterns (FEP)
//  Also used to scope modules and feature detection
var FEP = { 'supports': {} };

require( [ 'jquery', 'config' ], function(){

	"use strict";

	//  JQUERY DOMREADY
	$( document ).ready( function(){

		// We like javascript. Add 'js' class to use for styling work-a-rounds
		$( "html" ).attr( 'class', 'js' );

		FEP.lazyload.init( FEP.config.getArray() );
	} );

} );

//  Lazy loading all the required script for the current document.
//  See config.js to add your own scripts and enter any new file in the above AMD routing.

FEP.lazyload = (function(){

	"use strict";

	var fn = {
		loadScript: function(){

			var elem = this.elem,
				amd = this.amd,
				opts = this.opts,
				func = this.func,
				plugin = this.plugin,
				module = this.module,
				method = this.method;

			require( amd, function(){
				if( func !== void 0 ){
					// Assign the global function reference to a variable
					var fn = window[func];
					// Use the variable to invoke the function
					if( typeof fn === 'function' ){
						fn( elem );
					}
				}

				//  Standard jQuery plugin
				if( plugin !== void 0 ){
					if( typeof elem[plugin] === 'function' ){
						elem[plugin]( opts );
					}
				}

				//  Custom FEP module
				if( module !== void 0 ){
					if( typeof FEP[module] === 'function' ){

						var elems = $.makeArray( elem );
						var iterator = function(){

							var el = elems.shift();
							var mod = FEP[module]( $( el ), opts );
							for( var n = 0, l = method.length; n < l; n++ ) {
								mod[method[n]]();
							}

							//  Iterate through the functions/methods for the module
							if( elems.length > 0 ){
								setTimeout( iterator, 25 );
							}

						};
						iterator();

					}

				}
			} );
		},

		getScripts: function( array ){

			var items = array.concat();

			// Asynchronous invocation

			var iterator = function(){

				var start = +new Date();

				do {

					var item = items.shift();
					//  Invoke lazyLoad method with the current item
					if( item.elem.length > 0 ){
						fn.loadScript.call( item );
					}

				} while( items.length > 0 && (+new Date() - start < 50) ); // increase to 100ms if needed.

				if( items.length > 0 ){
					setTimeout( iterator, 25 );
				}
			};
			iterator();
		}

	};

	return {
		init: fn.getScripts
	};

})();

/*  Polyfills ################################################################# */

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function(){

	"use strict";

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
			|| window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if( !window.requestAnimationFrame )
		window.requestAnimationFrame = function( callback, element ){
			var currTime = new Date().getTime();
			var timeToCall = Math.max( 0, 16 - (currTime - lastTime) );
			var id = window.setTimeout( function(){
				                            callback( currTime + timeToCall );
			                            },
			                            timeToCall );
			lastTime = currTime + timeToCall;
			return id;
		};

	if( !window.cancelAnimationFrame )
		window.cancelAnimationFrame = function( id ){
			clearTimeout( id );
		};
}());

//  Console fallback.

(function( fallback ){

	"use strict";

	fallback = fallback || function(){ };

	// function to trap most of the console functions from the FireBug Console API.
	var trap = function(){
		// create an Array from the arguments Object
		var args = Array.prototype.slice.call( arguments );
		// console.raw captures the raw args, without converting toString
		console.raw.push( args );
		var message = args.join( ' ' );
		console.messages.push( message );
		fallback( message );
	};

	// redefine console
	if( typeof console === 'undefined' ){
		console = {
			messages      : [],
			raw           : [],
			dump          : function(){ return console.messages.join( '\n' ); },
			log           : trap,
			debug         : trap,
			info          : trap,
			warn          : trap,
			error         : trap,
			assert        : trap,
			clear         : function(){
				console.messages.length = 0;
				console.row.length = 0;
			},
			dir           : trap,
			dirxml        : trap,
			trace         : trap,
			group         : trap,
			groupCollapsed: trap,
			groupEnd      : trap,
			time          : trap,
			timeEnd       : trap,
			timeStamp     : trap,
			profile       : trap,
			profileEnd    : trap,
			count         : trap,
			exception     : trap,
			table         : trap
		};
	}

})( null ); // to define a fallback function, replace null with the name of the function (ex: alert)



