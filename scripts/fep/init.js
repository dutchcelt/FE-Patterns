/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    ########################################################################### */
    
    
//  LAZY LOADING ##############################################################

    // AMD ROUTING 
    require.config({ 
        baseUrl: "/scripts/minified",
        paths: {
            "jquery": "jquery-1.9.1-min",
            //"jquery": "jquery-2.0.0b2-min",
            "keepinview": "keepinview-min",
            "datatable": "jquery.dataTables-min",
            "fep-functions": "fep-functions-min"
        }
    });
    
    // Lazyload method
    function lazyLoad(){
        var elem = this.elem;
        var func = this.func;
        require(this.amd, function(){ 
            if (func) {
                // Assign the global function reference to a variable
                var fn = window[func];
                // Use the variable to invoke the function
                if(typeof fn === 'function') {
                    fn(elem);
                }
            }
        });
    }
    
    // Initiate lazyloading per object 
    function loadLazyScripts(array){
        
        var items = array.concat();
        
        // Asyncronous invocation 
        setTimeout(function(){
        
            var item = items.shift();
            
            //  Check if the current object returns any DOM elements from the jQuery selector
            if(item.elem.length>0){
                //  Invoke lazyLoad method with the current object 
                lazyLoad.call(item);
            }
            
            //  Iterate through the objects in the array 
            if (items.length > 0){
                setTimeout(arguments.callee, 0);
            }
            
        }, 0);
    }


    require(['jquery'],function(){ 

        // We like javascript. Add 'js' class to use for styling
        $("html").attr('class','js'); 
        
        /*  Loading DOM elements into an array of objects that will initiate lazy loading
        
         *  elem: The jquery selector that triggers the lazy load and gets passed to 'func'
         *  amd:  Asyncronous Script Modules (AMD) that need to load (see the require.config above)
         *  func: The function to execute (mostly found in fep-functions.js)od
         */
         
        var $lazyLoadArray = [
        
            {   // Keep navigation in view
                elem: $("nav"),
                amd:  ['keepinview','fep-functions'], 
                func: 'fepKeepInView' 
            },
            
            {   // Tabs
                elem: $(".tabs"),
                amd:  ['fep-functions'], 
                func: 'fepTabs' 
            },
            {   // Datatable
                elem: $(".datatable"),
                amd:  ['datatable','fep-functions'], 
                func: 'fepDatatable' 
            },
            {   // Canvas placeholder
                elem: $("canvas"),
                amd:  ['fep-functions'], 
                func: 'fepCanvas' 
            }
            
        ];
        
        //  JQUERY DOMREADY 
        $(document).ready(function(){
        
            loadLazyScripts($lazyLoadArray);

        });
            
    });
