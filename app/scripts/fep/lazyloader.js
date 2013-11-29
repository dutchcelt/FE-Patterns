
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
				global = this.global,
				load = this.load,
				module = this.module,
				method = this.method;

			require( amd, function(){

				if( load ){
					return;
				}

				if( global ){
					var fn = ( global === "window" ) ? window : window[global];
					if( typeof fn[func] === 'function' ){
						fn[func]( opts );
					}
				}

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
