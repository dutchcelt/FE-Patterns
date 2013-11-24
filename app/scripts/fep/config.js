///////////////////////////////////////////////////////////////////////////////
/*  Author:    C. Egor Kloos - DutchCelt Design */
///////////////////////////////////////////////////////////////////////////////

/*
 Loading DOM elements into an array of objects that will initiate lazy loading and execution.

 elem:   The jquery selector that triggers the lazy load and gets passed to 'func', 'plugin' or 'module'

 amd:    Asynchronous Script Modules (AMD) that is required to load

 func:   The function to execute (mostly found in fep-functions.js)

 plugin: Use this if you need to trigger a conventional jQuery plugin function that can be chained. You can pass options to the plugin if needed.

 module: These are functions scoped to the FEP namespace and using the module pattern. You can pass a jQuery selector, an options object and a method to invoke.

 */

///////////////////////////////////////////////////////////////////////////////


FEP.config = {

	getArray: function() {

		"use strict";

		return [

			////// Regular (global) functions ////////////////////////////////

			{   // Tabs
				elem: $( ".tabs" ),
				amd : ['modules'],
				func: 'fepTabs'
			},

			////// jQuery plugins ////////////////////////////////////////////

			{   // Keep navigation in view
				elem  : $( "nav" ),
				amd   : ['keepinview'],
				plugin: 'keepInView',
				opts  : { 'zindex': '4242' }
			},

			{   // Datepicker
				elem  : $( ".date" ),
				amd   : ['jquery', 'moment', 'dater'],
				plugin: 'dater',
				opts  : { 'format': "DD-MM-YYYY", placeholder: "DD-MM-YYYY" }
			},


			////// FEP modules ///////////////////////////////////////////////

			{   // Canvas placeholder
				elem  : $( "canvas" ),
				amd   : ['modules'],
				module: 'fakeCanvas',
				method: ["run"]
			}

		];

	}

}



