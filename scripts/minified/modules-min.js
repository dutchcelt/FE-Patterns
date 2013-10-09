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
var fepTabs=function(e){$(".tabs-tab:first",e).addClass("active");$(e).on("click",".tabs-tab-link",function(t){t.preventDefault();$(".tabs-tab",e).removeClass("active");$(t.target).closest(".tabs-tab").addClass("active");$(".target",t.delegateTarget).removeClass("target").show();$(this.hash).show(0,function(){var e=$(this).outerHeight()+120;$(t.delegateTarget).css("height",e+"px")});$(".tabs-pane",t.delegateTarget).not(this.hash).hide()});$(".tabs-tab:first .tabs-tab-link",e).trigger("click")};(function(e,t,n,r,i){e.fakeCanvas=function(e){var t={paint:function(){function r(e,t,r){n.beginPath();n.rect(e,200-r,t,r);n.fill()}var t=e.get()[0],n=t.getContext("2d");n.fillStyle="#08f";var i=5;for(var s=0;s<500;s+=i)r(s,i,200*Math.random())}};return{run:t.paint}}})(FEP,jQuery,window,document);