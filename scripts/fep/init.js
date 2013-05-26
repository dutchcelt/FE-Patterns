/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    ########################################################################### */
    
    
//  LAZY LOADING ##############################################################

    // AMD ROUTING 
    require.config({ 
        baseUrl: "/scripts/minified",
        paths: {
            "jquery": "jquery-2.0.1.min",
            "config": "config-min",
            "keepinview": "keepinview-min",
            "datatable": "jquery.dataTables-min",
            "modules": "modules-min"
        }
    });
    
    // Initiate the namespace for Front-end Patterns (FEP)
    var FEP = {};

    require(['jquery', 'config'],function(){ 

        //  JQUERY DOMREADY 
        $(document).ready(function(){

            // We like javascript. Add 'js' class to use for styling
            $("html").attr('class','js'); 
            
            var getAllScripts = FEP.lazyload;
            getAllScripts.init( FEP.config.getArray() );

        });
            
    });

    //  Lazy loading all the required script for the current document.
    //  See config.js to add your own scripts and enter any new file in the above AMD routing.
    
    FEP.lazyload = ( function(){
        var fn = {
            loadScript: function(){

                var elem = this.elem,
                    amd = this.amd,
                    opts = this.opts,
                    func = this.func,
                    plugin = this.plugin,
                    module = this.module,
                    method = this.method;
                    
                require( amd, function(){ 
                    if ( func ) {
                        // Assign the global function reference to a variable
                        var fn = window[func];
                        // Use the variable to invoke the function
                        if( typeof fn === 'function' ) {
                            fn( elem );
                        }
                    } 
                    if ( plugin ) {
                        if( typeof elem[plugin] === 'function' ) {
                            elem[plugin]( opts );
                        }
                    } 
                    if ( module ) {
                        if( typeof $[module] === 'function' ) {
                            elem.each(function( index, domElem ){
                                var mod = $[module]( $(domElem), opts );
                                for( n = 0, l = method.length; n < l; n++ ){
                                    mod[method[n]]();
                                }
                            });
                        }
        
                    }
                });
            },
            
            getScripts: function( array ){
                
                var items = array.concat();
                // Asyncronous invocation 
                setTimeout( function(){
                
                    var item = items.shift();
                    
                    //  Check if the current object returns any DOM elements from the jQuery selector
                    if( item.elem.length > 0 ){
                        //  Invoke lazyLoad method with the current object 
                        fn.loadScript.call( item );
                    }
                    
                    //  Iterate through the objects in the array 
                    if ( items.length > 0 ){
                        setTimeout( arguments.callee, 0 );
                    }
                    
                }, 0);
            }
            
        };
        
        return {
            init: fn.getScripts
        };
        
    })();

