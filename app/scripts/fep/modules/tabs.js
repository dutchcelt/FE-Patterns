/*! ###########################################################################

 Source: https://github.com/dutchcelt/FEP-Tabs

 Copyright (C) 2011 - 2013, C. Egor Kloos. All rights reserved.
 GNU General Public License, version 3 (GPL-3.0)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see http://www.opensource.org/licenses/gpl-3.0.html

 ########################################################################### */



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
	if( window.FEP === void 0 ) {
		window.FEP = { 'supports': {} };
	}

	FEP.supports.historyState = ( history.replaceState ) ? true : false;

	FEP.tabs = function( tabsSelector, settings ){
		var scrollLocation;
		var hash = window.location.hash;

		var defaults = {
			historyState : FEP.supports.historyState
		}
		var options = $.extend( {}, defaults, settings );

		var fn = {

			tabEvent: function( event ){

				event.preventDefault();
				scrollLocation = $( window ).scrollTop();
				hash = $( event.target ).attr( 'href' );

				if( event.type === "loadhash" ){
					$( window ).trigger( "tabHash" );
				} else if( !options.historyState ){
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
				if($( hash, this.$elem).length === 0) { return false };
				$( window ).scrollTop( scrollLocation );
				this.setTab();
			},

			setTab: function(){
				$( ".tabs-pane", this.$elem ).removeClass( "target" );
				$( hash, this.$elem  ).addClass( "target" );
				$( ".tabs-tab", this.$elem ).removeClass( "active" );
				$( ".tabs-tab-link[href='" + window.location.hash + "']", this.$elem ).closest( '.tabs-tab' ).addClass( "active" );
			},

			init: function(){

				this.$elem.addClass( "loaded" );

				//  Attach events
				this.$elem.on( "loadhash loadTAB click", ".tabs-tab-link", this.tabEvent.bind( this ) );
				$( window ).on( "tabHash hashchange", this.hashEvent.bind( this ) );
				//  Load a tab!
				if( !window.location.hash ){
					$( ".tabs-tab-link[href]:eq(0)", this.$elem ).trigger( 'loadTAB' );
				} else if($( window.location.hash, this.$elem).length > 0){
					$( ".tabs-tab-link[href='" + window.location.hash + "']", this.$elem ).trigger( 'loadhash' );
				} else if($( window.location.hash, this.$elem).length === 0){
					$( ".tabs-tab", this.$elem ).removeClass( "active" ).eq(0).addClass( "active" );
					$( ".tabs-pane", this.$elem ).removeClass( "target" ).eq(0).addClass( "target" );
				}
			}

		};

		return ( function(){
			return $( tabsSelector ).each( function( index, tabsElem ){
				var newFn = Object.create( fn );
				newFn.$elem = $( tabsElem );
				newFn.index = index;
				newFn.init();
			});
		})();

	};

} );