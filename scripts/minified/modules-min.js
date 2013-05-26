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
    ########################################################################### */// TABS
var fepTabs=function(e){$("ul li:first",e).addClass("active");$(e).on("click","a",function(t){t.preventDefault();$("li",e).removeClass("active");$(this).closest("li").addClass("active");$("div[id*='tab']",t.delegateTarget).hide();$(this.hash).show(0,function(){var e=$(this).outerHeight()+120;$(t.delegateTarget).css("height",e+"px")})});$("ul li:first a",e).trigger("click")};(function(e,t,n,r){e.fepCanvas=function(e){var t={paint:function(){function r(e,t,r){n.beginPath();n.rect(e,200-r,t,r);n.fill()}var t=e.get()[0],n=t.getContext("2d");n.fillStyle="#08f";var i=5;for(var s=0;s<500;s+=i)r(s,i,200*Math.random())}};return{run:t.paint}}})(jQuery,window,document);