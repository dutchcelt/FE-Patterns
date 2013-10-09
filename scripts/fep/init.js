/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    ########################################################################### */
    
    
//  LAZY LOADING ##############################################################

    // AMD ROUTING 
    require.config({ 
        baseUrl: "/scripts/minified",
        paths: {
            "jquery": "jquery-2.0.3.min",
            "config": "config-min",
            "keepinview": "keepinview-min",
            "date": "date-min",
            "dater": "dater-min",
            "datatable": "jquery.dataTables-min",
            "modules": "modules-min"
        }
    });
    
    //  Initiate the namespace for Front-end Patterns (FEP)
    //  Also used to scope modules
    var FEP = {};
    
    require( [ 'jquery', 'config' ], function(){ 

        //  JQUERY DOMREADY 
        $(document).ready(function(){

            // We like javascript. Add 'js' class to use for styling work-a-rounds
            $("html").attr('class','js'); 
            
            FEP.lazyload.init( FEP.config.getArray() );

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
                    if ( func !== void 0 ) {
                        // Assign the global function reference to a variable
                        var fn = window[func];
                        // Use the variable to invoke the function
                        if( typeof fn === 'function' ) {
                            fn( elem );
                        }
                    } 
                    
                    //  Standard jQuery plugin
                    if ( plugin !== void 0 ) {
                        if( typeof elem[plugin] === 'function' ) {
                            elem[plugin]( opts );
                        }
                    } 
                    
                    //  Custom FEP module
                    if ( module !== void 0 ) {
                        if( typeof FEP[module] === 'function' ) {
                        
                            var elems = $.makeArray( elem ); 
                            var iterator = function(){
                            
                                var el = elems.shift();                    
                                var mod = FEP[module]( $(el), opts );
                                for( n = 0, l = method.length; n < l; n++ ){
                                    mod[method[n]]();
                                }
                                
                                //  Iterate through the functions/methods for the module
                                if ( elems.length > 0 ){
                                    setTimeout( iterator, 25 );
                                }
                                
                            };
                            iterator();
                            
                        }
        
                    }
                });
            },
            
            getScripts: function( array ){
                
                var items = array.concat();
                
                // Asyncronous invocation 
                
                var iterator = function(){
            
                    var start = +new Date();
            
                    do {
                    
                        var item = items.shift();
                        //  Invoke lazyLoad method with the current object 
                        if( item.elem.length > 0 ){
                            //  Invoke lazyLoad method with the current object 
                            fn.loadScript.call( item );
                        }
                        
                    } while (items.length > 0 && (+new Date() - start < 50)); // increase to 100ms if needed.
            
                    if (items.length > 0){
                        setTimeout(iterator, 25);
                    } 
                };
                iterator();
            }
            
        };
        
        return {
            init: fn.getScripts
        };
        
    })();



/*  Polyfills ################################################################# */

//  Prototypal inheritance! 
    
    if (typeof Object.create !== "function") {
        Object.create = function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

