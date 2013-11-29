
//  FAKE CANVAS PLACEHOLDER - Using the module pattern scoped to FEP
(function( FEP, $ ){

	"use strict";

	FEP.fakeCanvas = function( elem ){
		var module = {
			paint: function(){
				var el = elem.get()[0];
				var ctx = el.getContext( '2d' );
				ctx.fillStyle = '#08f';
				function chart( x, w, val ){
					ctx.beginPath();
					ctx.rect( x, 200 - val, w, val );
					ctx.fill();
				}

				var w = 5;
				for( var x = 0; x < 500; x += w ) {
					chart( x, w, 200 * Math.random() );
				}
			}

		};
		return {
			run: module.paint
		};
	}
})( FEP, jQuery );

