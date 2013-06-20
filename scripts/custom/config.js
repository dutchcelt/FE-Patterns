/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    ########################################################################### */

        
    /*  Loading DOM elements into an array of objects that will initiate lazy 
        loading and execution.
    
     *  elem:   The jquery selector that triggers the lazy load and gets 
                passed to 'func', 'plugin' or 'module'
     *  amd:    Asyncronous Script Modules (AMD) that is required to load 
     
     *  func:   The function to execute (mostly found in fep-functions.js)
     *  plugin: Use this if you need to tigger a conventional jQuery plugin 
                that can be chained
                You can pass options to the plugin if needed.
     *  module: These are scoped functions attached to jquery using the 
                module pattern.
                You can pass and element, options and a method to invoke.
                
        http://alistapart.com/article/the-design-of-code-organizing-javascript
     */
     
    FEP.config  = {
        
        getArray: function(){ 
        
            return [
            
                ////// Regular functions //////////////////////////////////////////
                
                {   // Tabs 
                    elem: $(".tabs"),
                    amd:  ['modules'], 
                    func: 'fepTabs' 
                },
                
                ////// jQuery plugins ////////////////////////////////////////////
                
                {   // Keep navigation in view 
                    elem: $("nav"),
                    amd:  ['keepinview'], 
                    plugin: 'keepInView',
                    opts: { 'zindex': '424' } 
                },
                
                {   // DataTable script  
                    elem: $(".datatable"),
                    amd:  ['datatable'], 
                    plugin: 'dataTable',
                    opts: {
                        "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                        "iDisplayLength": 5,
                        "bLengthChange": true,
                        "sPaginationType": "full_numbers",
                        "aoColumns": [ null, null, null, { "bSortable": false } ]
                    } 
                },
                
                ////// jQuery modules ////////////////////////////////////////////
                
                {   // Canvas placeholder
                    elem: $("canvas"),
                    amd:  ['modules'], 
                    module: 'fepCanvas',
                    method: ["run"]
                }
                
            ];
            
        }

    }
