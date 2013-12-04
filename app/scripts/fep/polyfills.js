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



if (!Object.create) {
	Object.create = (function(){
		function F(){}

		return function(o){
			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o
			return new F()
		}
	})()
}