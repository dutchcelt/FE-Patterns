///////////////////////////////////////////////////////////////////////////////
/*  Author:    C. Egor Kloos - DutchCelt Design */
///////////////////////////////////////////////////////////////////////////////


// TABS

(function( FEP, $ ){

	"use strict";

	FEP.tabs = function( $tabs ){

		var scrollLocation;
		var hash = window.location.hash;

		var fn = {
			tab     : {
				click: function( event ){
					event.preventDefault();
					var that = event.data;
					that.$event = event;
					scrollLocation = $( window ).scrollTop();
					hash = $( event.target ).attr( 'href' );
					if( event.type === "loadhash" ){
						$( window ).trigger( "hashash" );
					} else {
						window.location.hash = hash.substr( 1 );
					}
				},
				hash : function( event ){
					event.preventDefault();
					var that = event.data;
					$( window ).scrollTop( scrollLocation );
					if( typeof that.callback === "function" ){
						that.callback();
					}
				}
			},
			callback: function(){
				this.$elem.addClass( "loaded" );
				$( hash ).css( "visibility", "visible" );
				$( ".tabs-tab", this.$elem ).removeClass( "active" );
				$( this.$event.target ).closest( '.tabs-tab' ).addClass( "active" );
				return false;
			},
			tabEvents  : function(){
				this.$elem.on( "loadhash click", ".tabs-tab-link", this, this.tab.click );
				$( window ).on( "hashash hashchange", this, this.tab.hash );

				if( !window.location.hash ){
					$( ".tabs-tab-link[href]:eq(0)", this.$elem ).trigger( 'click' );
				} else {
					$( ".tabs-tab-link[href='" + window.location.hash + "']", this.$elem ).trigger( 'loadhash' );
				}
			}
		};

		return {
			load: function(){
				$tabs.each( function( index, tabsElem ){
					var newFn = Object.create( fn );
					newFn.$elem = $( tabsElem );
					newFn.tabEvents();
				});
			}
		};

	};

})( FEP, jQuery );


//  FAKE CANVAS PLACEHOLDER - Using the module pattern scoped to FEP

;
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

