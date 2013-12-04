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
		define( ['FEP-Tabs'], factory );
	} else {
		// Browser globals
		factory( window );
	}

})( function(){

	"use strict";

	//  Detect if the FEP namespace is available. (FEP = Front-end Patterns)
	if( window.FEP === void 0 ){
		window.FEP = { 'supports': {} };
	}

	FEP.supports.historyState = ( history.replaceState ) ? true : false;

	FEP.tabs = function( selector, settings ){

		var tabBlocks = Array.prototype.slice.call( document.querySelectorAll( selector ) );

		var scrollLocation;
		var hash = window.location.hash || "";

		var defaults = {
			historyState: FEP.supports.historyState
		}
		var options = defaults;

		//  Custom events
		var loadhash = document.createEvent( 'Event' );
		loadhash.initEvent( 'loadhash', true, true );
		var loadTAB = document.createEvent( 'Event' );
		loadTAB.initEvent( 'loadTAB', true, true );

		var fn = {

			tabEvent: function( event ){
				if( event.target.className.indexOf( "tabs-tab-link" ) < 0 ){
					return false;
				}
				event.preventDefault();
				scrollLocation = document.documentElement.scrollTop;
				hash = event.target.getAttribute( 'href' );

				if( event.type === "loadhash" ){
					this.hashEvent( event );
				} else if( !options.historyState ){
					window.location.hash = hash.substr( 1 );
				} else {
					if( event.type === "click" ){
						history.pushState( {}, document.title, hash );
					}
					if( event.type === "loadTAB" ){
						history.replaceState( {}, document.title, hash );
					}
					this.hashEvent( event );
				}

			},

			hashEvent: function( event ){
				event.preventDefault();
				if( this.elem.querySelectorAll( hash ).length === 0 ){ return false }
				;
				document.documentElement.scrollTop = scrollLocation
				this.setTab();
			},

			setTab: function(){

				var target = this.elem.querySelector( ".target" );
				var active = this.elem.querySelector( ".active" );

				if( target ){
					target.className = target.className.replace( /(?:^|\s)target(?!\S)/, '' );
				}
				if( active ){
					active.className = active.className.replace( /(?:^|\s)active(?!\S)/, '' );
				}

				if( hash ){
					this.elem.querySelector( hash ).className += " target";
					this.elem.querySelector( ".tabs-tab-link[href='" + hash + "']" ).parentNode.className += " active";
				}
			},

			init: function(){

				this.elem.className += " loaded";

				//  Attach events
				this.elem.addEventListener( 'click', this.tabEvent.bind( this ), false );
				this.elem.addEventListener( 'loadhash', this.tabEvent.bind( this ), false );
				this.elem.addEventListener( 'loadTAB', this.tabEvent.bind( this ), false );

				window.addEventListener( 'hashchange', this.hashEvent.bind( this ), false );


				//  Load a tab!
				if( !window.location.hash ){
					this.elem.querySelector( ".tabs-tab-link" ).dispatchEvent( loadTAB )
				} else if( this.elem.querySelectorAll( window.location.hash ).length > 0 ){
					this.elem.querySelector( ".tabs-tab-link[href='" + window.location.hash + "']" ).dispatchEvent( loadhash )
				} else if( this.elem.querySelectorAll( window.location.hash ).length === 0 ){
					this.elem.querySelector( ".tabs-tab" ).className += " active";
					this.elem.querySelector( ".tabs-pane" ).className += " target";
				}
			}

		};

		return (function(){

			tabBlocks.forEach( function( tabsElem ){
				var newFn = Object.create( fn );
				newFn.elem = tabsElem;
				newFn.init();
			} );

		})();

	};

} );