/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    
    Example wrapper to enable lazy loading from init.js:
    var fepFunctionName = function($fepElements){ ... }
    
    You can also use a jQuery module pattern:
    ;(function ( $, window, document, undefined ) {
        $.NAMEOFMODULE = function( elem, opts ) {
            var module = {
                opts : $.extend( {}, opts ),
                run: function( ) { ... }
            };
            return {
                run: module.run
            };
        }
    })( jQuery, window, document );
    ########################################################################### */


    // TABS
    var fepTabs = function($fepElements){
        $("ul li:first",$fepElements).addClass('active');
        $($fepElements).on("click","a",function(event){
            event.preventDefault();
            $("li",$fepElements).removeClass("active");
            $(this).closest('li').addClass("active");
            $("div[id*='tab']",event.delegateTarget).hide();
            $(this.hash).show(0,function(){
                var h = $(this).outerHeight() + 120;
                $(event.delegateTarget).css("height",h+"px");
            });
        });
        $("ul li:first a",$fepElements).trigger('click');
    }
    
    
    //  FAKE CANVAS PLACEHOLDER - Using the module pattern
    ;(function ( $, window, document, undefined ) {
    
        $.fepCanvas = function( elem ) {
            var module = {
                paint: function( ) {
                    var el = elem.get()[0];
                    var ctx = el.getContext('2d');
                    ctx.fillStyle = '#08f';
                    function chart( x, w, val ) {
                      ctx.beginPath();
                      ctx.rect(x,200-val,w,val);
                      ctx.fill();
                    }
                    var w=5;
                    for (var x=0; x < 500; x+=w) {
                      chart( x, w, 200*Math.random() );
                    }
                }
                
            };
            return {
                run: module.paint
            };
        }
    })( jQuery, window, document );
    
    
    
