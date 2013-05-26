/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    ########################################################################### */

        
    /*  Loading DOM elements into an array of objects that will initiate lazy loading and execution.
    
     *  elem:   The jquery selector that triggers the lazy load and gets passed to 'func', 'plugin' or 'module'
     *  amd:    Asyncronous Script Modules (AMD) that is required to load 
     
     *  func:   The function to execute (mostly found in fep-functions.js)
     *  plugin: Use this if you need to tigger a conventional jQuery plugin that can be chained
                Yoy can pass options to the plugin if needed.
     *  module: These are scoped functions attached to jquery using the module pattern.
                You can pass and element, options and a method to invoke.
                http://alistapart.com/article/the-design-of-code-organizing-javascript
     */
     
    fep.config = function(){
        
        return [
        
            {   // Tabs - Using a custom function
                elem: $(".tabs"),
                amd:  ['fep-functions'], 
                func: 'fepTabs' 
            },
            
            {   // Keep navigation in view - Triggering a jquery plugin
                elem: $("nav"),
                amd:  ['keepinview'], 
                plugin: 'keepInView',
                opts: { 'zindex': '424' } 
            },
            {   // DataTable script - Triggering a jquery plugin 
                elem: $(".datatable"),
                amd:  ['datatable','fep-functions'], 
                plugin: 'dataTable',
                opts: {
                    "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                    "iDisplayLength": 5,
                    "bLengthChange": true,
                    "sPaginationType": "full_numbers",
                    "aoColumns": [ null, null, null, { "bSortable": false } ]
                } 
            },
            
            {   // Canvas placeholder
                elem: $("canvas"),
                amd:  ['fep-functions'], 
                module: 'fepCanvas',
                method: ["run"]
            }
            
        ];
        
    }
