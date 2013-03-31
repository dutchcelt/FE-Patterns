/*  ###########################################################################
    Author:     Lunatech Research
    
    Example wrapper to enable lazy loading from init.js:
    var fepFunctionName = function($fepElements){ ... }
    
    ########################################################################### *///  KEEP IN VIEW 
var fepKeepInView=function(e){e.keepInView({zindex:42})},fepTabs=function(e){$("ul li:first",e).addClass("active");$(e).on("click","a",function(t){t.preventDefault();$("li",e).removeClass("active");$(this).closest("li").addClass("active");$("div[id*='tab']",t.delegateTarget).hide();$(this.hash).show(0,function(){var e=$(this).outerHeight()+120;$(t.delegateTarget).css("height",e+"px")})});$("ul li:first a",e).trigger("click")},fepDatatable=function(e){e.each(function(){var e=$(this);e.dataTable({aLengthMenu:[[5,10,20,-1],[5,10,20,"All"]],iDisplayLength:5,bLengthChange:!0,sPaginationType:"full_numbers",aoColumns:[null,null,null,{bSortable:!1}]})})},fepCanvas=function(e){e.each(function(){function n(e,n,r){t.beginPath();t.rect(e,200-r,n,r);t.fill()}var e=$(this).get()[0],t=e.getContext("2d");t.fillStyle="#08f";var r=5;for(var i=0;i<500;i+=r)n(i,r,200*Math.random())})};