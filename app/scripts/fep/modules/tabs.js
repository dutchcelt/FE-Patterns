// TABS

(function( factory ) {

	"use strict";

	if( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define( ['jquery'], factory );
	} else {
		// Browser globals
		factory( jQuery, FEP );
	}

})(function( $ ){

	"use strict";

	FEP.tabs = function( $tabs ){

		var scrollLocation;
		var hash = window.location.hash;

		var fn = {
			tabEvent : function( event ){
				event.preventDefault();
				var that = event.data;
				that.$event = event;
				scrollLocation = $( window ).scrollTop();
				hash = $( event.target ).attr( 'href' );
				if( event.type === "loadhash" ){
					$( window ).trigger( "tabHash" );
				} else {
					window.location.hash = hash.substr( 1 );
				}
			},
			hashEvent: function( event ){
				event.preventDefault();
				hash = window.location.hash || false;
				var that = event.data;
				if( hash ){
					$( window ).scrollTop( scrollLocation );
					that.callback.call( that );
				}
			},
			callback : function(){
				this.$elem.addClass( "loaded" );
				$( hash ).css( "visibility", "visible" );
				$( ".tabs-tab", this.$elem ).removeClass( "active" );
				$( ".tabs-tab-link[href='" + window.location.hash + "']", this.$elem ).closest( '.tabs-tab' ).addClass( "active" );
			},
			tabEvents: function(){
				this.$elem.on( "loadhash click", ".tabs-tab-link", this, this.tabEvent );
				$( window ).on( "tabHash hashchange", this, this.hashEvent );

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
				} );
			}
		};

	};

});