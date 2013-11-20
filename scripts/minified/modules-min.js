/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    
    Example wrapper to enable lazy loading from init.js:
    var fepFunctionName = function($fepElements){ ... }
    
    You can also use a module pattern scoped to FEP:
    ;(function ( FEP, $, window, document, undefined ) {
        FEP.NAMEOFMODULE = function( elem, opts ) {
            var module = {
                opts : $.extend( {}, opts ),
                run: function( ) { ... }
            };
            return {
                run: module.run
            };
        }
    })( FEP, jQuery, window, document );
    ########################################################################### */// TABS
var fepTabs=function(e){"use strict";var t,n=window.location.hash,r=function(e,r){var i;$(e).on("loadhash click",".tabs-tab-link",function(e){e.preventDefault();t=e;i=$(window).scrollTop();n=$(e.target).attr("href");e.type==="loadhash"?$(window).trigger("hashash"):window.location.hash=n.substr(1)});$(window).on("hashash hashchange",function(e){$(window).scrollTop(i);typeof r=="function"&&r()})};r(e,function(){$(".tabs-tab",e).removeClass("active");$(t.target).closest(".tabs-tab").addClass("active")});window.location.hash?$(".tabs-tab-link[href='"+window.location.hash+"']").trigger("loadhash"):$(".tabs-tab-link[href='#tabs-0']").trigger("click")};(function(e,t){"use strict";e.fakeCanvas=function(e){var t={paint:function(){function r(e,t,r){n.beginPath();n.rect(e,200-r,t,r);n.fill()}var t=e.get()[0],n=t.getContext("2d");n.fillStyle="#08f";var i=5;for(var s=0;s<500;s+=i)r(s,i,200*Math.random())}};return{run:t.paint}}})(FEP,jQuery);