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
                
                var iterator = function(){
                
                    var item = items.shift();
                    
                    //  Check if the current object returns any DOM elements from the jQuery selector
                    if( item.elem.length > 0 ){
                        //  Invoke lazyLoad method with the current object 
                        fn.loadScript.call( item );
                    }
                    
                    //  Iterate through the objects in the array 
                    if ( items.length > 0 ){
                        setTimeout( iterator, 0 );
                    }
                    
                };
                iterator();
            }
            
        };
        
        return {
            init: fn.getScripts
        };
        
    })();



/*  Prototypal inheritance! ###################################################
    
    *   ES5 15.2.3.5
    *   http://es5.github.com/#x15.2.3.5
    *   https://github.com/kriskowal/es5-shim/blob/master/es5-sham.js
    */
    
    if (!Object.create) {
    
        // Contributed by Brandon Benvie, October, 2012
        var createEmpty;
        var supportsProto = Object.prototype.__proto__ === null;
        if (supportsProto || typeof document == 'undefined') {
            createEmpty = function () {
                return { "__proto__": null };
            };
        } else {
            // In old IE __proto__ can't be used to manually set `null`, nor does
            // any other method exist to make an object that inherits from nothing,
            // aside from Object.prototype itself. Instead, create a new global
            // object and *steal* its Object.prototype and strip it bare. This is
            // used as the prototype to create nullary objects.
            createEmpty = function () {
                var iframe = document.createElement('iframe');
                var parent = document.body || document.documentElement;
                iframe.style.display = 'none';
                parent.appendChild(iframe);
                iframe.src = 'javascript:';
                var empty = iframe.contentWindow.Object.prototype;
                parent.removeChild(iframe);
                iframe = null;
                delete empty.constructor;
                delete empty.hasOwnProperty;
                delete empty.propertyIsEnumerable;
                delete empty.isPrototypeOf;
                delete empty.toLocaleString;
                delete empty.toString;
                delete empty.valueOf;
                empty.__proto__ = null;
    
                function Empty() {}
                Empty.prototype = empty;
                // short-circuit future calls
                createEmpty = function () {
                    return new Empty();
                };
                return new Empty();
            };
        }
    
        Object.create = function create(prototype, properties) {
    
            var object;
            function Type() {}  // An empty constructor.
    
            if (prototype === null) {
                object = createEmpty();
            } else {
                if (typeof prototype !== "object" && typeof prototype !== "function") {
                    // In the native implementation `parent` can be `null`
                    // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
                    // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
                    // like they are in modern browsers. Using `Object.create` on DOM elements
                    // is...err...probably inappropriate, but the native version allows for it.
                    throw new TypeError("Object prototype may only be an Object or null"); // same msg as Chrome
                }
                Type.prototype = prototype;
                object = new Type();
                // IE has no built-in implementation of `Object.getPrototypeOf`
                // neither `__proto__`, but this manually setting `__proto__` will
                // guarantee that `Object.getPrototypeOf` will work as expected with
                // objects created using `Object.create`
                object.__proto__ = prototype;
            }
    
            if (properties !== void 0) {
                Object.defineProperties(object, properties);
            }
    
            return object;
        };
    }    

