///////////////////////////////////////////////////////////////////////////////
/*  Author:    C. Egor Kloos - DutchCelt Design */
///////////////////////////////////////////////////////////////////////////////

/*
 Author:    C. Egor Kloos - DutchCelt Design

 Example wrapper to enable lazy loading from init.js:
 var fepFunctionName = function($fepElements){ ... }

 You can also use a module pattern scoped to FEP:
 ;(function ( FEP, $, window, document, undefined ) {
    FEP.NAMEOFMODULE = function( elem, opts ) {
        var module = {
            opts : $.extend( {}, opts ),
            run: function( ) { ... }
        };
        return {
            run: module.run
        };
    }
 })( FEP, jQuery, window, document );

 */

//////////////////////////////////////////////////////////////////////////////


// TABS

var fepTabs = function( $fepElements ) {

	"use strict";

	var tabevent;
	var hash = window.location.hash;
	var hashThis = function( $elem, cb ) {
		var scrollLocation;
		$( $elem ).on( "loadhash click", ".tabs-tab-link", function( event ) {
			event.preventDefault();
			tabevent = event
			scrollLocation = $( window ).scrollTop();
			hash = $( event.target ).attr( 'href' );
			window.location.hash = hash.substr( 1 );
			if( event.type === "loadhash" ) {
				$( window ).trigger( "hashash" );
			}
			;
		} );
		$( window ).on( "hashash hashchange", function( event ) {
			event.preventDefault();
			$( window ).scrollTop( scrollLocation );
			if( typeof cb === "function" ) {
				cb();
			}
		} );
	};
	hashThis( $fepElements, function() {
		$( ".tabs-tab", $fepElements ).removeClass( "active" );
		$( tabevent.target ).closest( '.tabs-tab' ).addClass( "active" );
		$( ".target", tabevent.delegateTarget ).removeClass( "target" ).show();
		$( hash ).show( 0, function() {
			var h = $( this ).outerHeight() + 120;
			$( tabevent.delegateTarget ).css( "height", h + "px" );
		} );
		$( ".tabs-tab-link[href='" + window.location.hash + "']" ).trigger( 'click' );
	} );
	if( !window.location.hash ) {
		$( ".tabs-tab-link[href]:eq(0)" ).trigger( 'click' );
	} else {
		$( ".tabs-tab-link[href='" + window.location.hash + "']").trigger( 'loadhash' );
	}

};


//  FAKE CANVAS PLACEHOLDER - Using the module pattern scoped to FEP

;(function( FEP, $ ) {

	"use strict";

	FEP.fakeCanvas = function( elem ) {
		var module = {
			paint: function() {
				var el = elem.get()[0];
				var ctx = el.getContext( '2d' );
				ctx.fillStyle = '#08f';
				function chart( x, w, val ) {
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

