// TABS

(function( factory ){

	"use strict";

	if( typeof define === 'function' && define.amd ){
		// AMD. Register as an anonymous module.
		define( ['jquery'], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}

})( function( $ ){

	"use strict";

	//  Detect if the FEP namespace is available. (FEP = Front-end Patterns)
	if( FEP === void 0 ) {
		window.FEP = { 'supports': {} };
	}

	FEP.supports.historyState = ( history.replaceState ) ? true : false;

	FEP.tabs = function( $tabs ){
		var scrollLocation;
		var hash = window.location.hash;

		var fn = {

			tabEvent: function( event ){

				event.preventDefault();

				scrollLocation = $( window ).scrollTop();
				hash = $( event.target ).attr( 'href' );

				if( event.type === "loadhash" ){
					$( window ).trigger( "tabHash" );
				} else if( !FEP.supports.historyState ){
					window.location.hash = hash.substr( 1 );
				} else {
					if( event.type === "click" ){
						history.pushState( {}, document.title, hash );
					}
					if( event.type === "loadTAB"  ){
						history.replaceState( {}, document.title, hash );
					}
					$( window ).trigger( "tabHash" );
				}

			},

			hashEvent: function( event ){
				event.preventDefault();
				hash = window.location.hash || false;
				if( hash ){
					$( window ).scrollTop( scrollLocation );
					this.setTab();
				}
			},

			setTab: function(){
				this.$elem.addClass( "loaded" );
				if( FEP.supports.historyState ){
					$( ".tabs-pane", this.$elem ).hide();
					$( hash ).show();
				}
				$( ".tabs-tab", this.$elem ).removeClass( "active" );
				$( ".tabs-tab-link[href='" + window.location.hash + "']", this.$elem ).closest( '.tabs-tab' ).addClass( "active" );
			},

			init: function(){
				//  Attach events
				this.$elem.on( "loadhash loadTAB click", ".tabs-tab-link", this.tabEvent );
				$( window ).on( "tabHash hashchange", this.hashEvent.bind( this ) );
				//  Load a tab!
				if( !window.location.hash ){
					$( ".tabs-tab-link[href]:eq(0)", this.$elem ).trigger( 'loadTAB' );
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
					newFn.init();
				} );
				return $tabs;
			}
		};

	};

} );