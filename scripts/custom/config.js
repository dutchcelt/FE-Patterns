/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    ########################################################################### */

        
    /*  Loading DOM elements into an array of objects that will initiate lazy 
        loading and execution.
    
     *  elem:   The jquery selector that triggers the lazy load and gets 
                passed to 'func', 'plugin' or 'module'
     *  amd:    Asynchronous Script Modules (AMD) that is required to load
     
     *  func:   The function to execute (mostly found in fep-functions.js)
     *  plugin: Use this if you need to trigger a conventional jQuery plugin
                function that can be chained.
                You can pass options to the plugin if needed.
     *  module: These are functions scoped to the FEP namespace and using 
                the module pattern. You can pass a jQuery selector, 
                an options object and a method to invoke.
                
        http://alistapart.com/article/the-design-of-code-organizing-javascript
     */
     
    FEP.config  = {
        
        getArray: function(){ 
        
            return [
            
                ////// Regular (global) functions ////////////////////////////////

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
                    opts: { 'zindex': '4242' }
                },
                
                {   // Keep navigation in view 
                    elem: $(".date"),
                    amd:  ['date','dater'], 
                    plugin: 'dater',
                    opts: { 'format':"MM-dd-yyyy" } 
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
                
                ////// FEP modules ///////////////////////////////////////////////
                
                {   // Canvas placeholder
                    elem: $("canvas"),
                    amd:  ['modules'], 
                    module: 'fakeCanvas',
                    method: ["run"]
                }
                
            ];
            
        }

    }



