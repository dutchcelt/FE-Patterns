/*
 Loading DOM elements into an array of objects that will initiate
 lazy loading and execution.

 elem:      The jquery selector that triggers the lazy load and
            gets passed to 'func', 'plugin' or 'module'
 selector:   This is if you are using a selector string instead of a node elem
 amd:       Asynchronous Script Modules (AMD) that is required to load
 func:      The function to execute (mostly found in fep-functions.js) and
            will pass the 'elem' as an argument
 plugin:    Use this if you need to trigger a conventional
            jQuery plugin function that can be chained. You can pass options
            to the plugin if needed.
 module:    These are functions scoped to the FEP namespace and using
            the module pattern. You can pass a jQuery selector,
            an options object and a method to invoke.
 load:      This is used when you're only going to load the file.
            Usually these invoke themselves.
 global:    Set the global scope to 'window' or a namespace so you van invoke
            the function from that scope. Pass our own arguments
            through with the 'opts' key.
 */

FEP.config = {

	getArray: function(){

		"use strict";

		return [

			////// Simple (load) functions ///////////////////////////////////

			/*
			 {   // Example
			 elem: $( ".exampleClass" ),
			 amd : ['exampleAMD'],
			 load: true
			 },
			 */

			////// Global functions //////////////////////////////////////////

			{   // Prism
				elem  : $( "code[class*='language']" ),
				amd   : ['prism'],
				global: 'Prism',
				func  : 'highlightAll'
			},


			////// jQuery plugins ////////////////////////////////////////////

			{   // Datepicker
				elem  : $( ".date" ),
				amd   : ['moment', 'dater'],
				plugin: 'dater',
				opts  : { 'format': "DD-MM-YYYY", placeholder: "DD-MM-YYYY" }
			},


			////// FEP modules ///////////////////////////////////////////////

			{   // Keep navigation in view
				selector: "nav, .tabs-list",
				amd     : ['FEP-KeepInView'],
				module  : 'KeepInView',
				opts    : { zindex: '42', cloned: true, stacked: true }
			},
			{   // Tabs
				selector: ".tabs",
				amd     : ['FEP-Tabs'],
				module  : 'tabs'
			}

		];

	}

}



