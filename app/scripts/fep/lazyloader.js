//  Lazy loading all the required script for the current document.
//  See config.js to add your own scripts and enter any new file in the above AMD routing.

FEP.lazyload = (function(){

	"use strict";

	var fn = {
		loadScript: function(){

			var elem = this.elem,
				selector = this.selector,
				amd = this.amd || "",
				opts = this.opts || null,
				func = this.func || "",
				plugin = this.plugin,
				global = this.global,
				load = this.load,
				module = this.module,
				method = this.method;

			require( amd, function(){

				if( load ){
					return;
				}

				if( global !== void 0 ){
					var fn = ( global === "window" ) ? window : window[global];
					if( typeof fn[func] === 'function' ){
						fn[func]( opts );
					} else if( typeof fn === 'function' ){
						fn( opts );
					}
				}

				if( func !== void 0 && global === void 0 ){
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

						if( elem ){
							var mod = FEP[module]( elem, opts );
							if( method ){
								for( var n = 0, l = method.length; n < l; n++ ) {
									mod[method[n]]();
								}
							}
						} else {

							var mod = FEP[module]( selector, opts );
							if( method ){
								for( var n = 0, l = method.length; n < l; n++ ) {
									mod[method[n]]();
								}
							}
						}
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
					fn.loadScript.call( item );

				} while( items[0] !== void 0 && (+new Date() - start < 50) ); // increase to 100ms if needed.

				if( items[0] !== void 0 ){
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
