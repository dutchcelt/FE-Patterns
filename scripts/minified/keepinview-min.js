/*! ###########################################################################
    
    Source: https://github.com/dutchcelt/Keep-in-View
    
    Copyright (C) 2011 - 2012,  Lunatech Labs B.V., C. Egor Kloos. All rights reserved.
    GNU General Public License, version 3 (GPL-3.0)
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.opensource.org/licenses/gpl-3.0.html
    
    ########################################################################### */// Uses AMD or browser globals to create a jQuery plugin.
(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){e.fn.keepInView=function(t){return this.each(function(n,r){var i=e(r),s,o={fixed:!1,edgeOffset:0,zindex:e(r).css("zIndex"),customClass:!1,trigger:"both",scrollable:!1,h:e(r).height(),w:e(r).width(),offsetAnchor:!1,cloned:!1},u=e.extend({},o,t);if(u.cloned){s=e(r).parents().eq(0);i=e(r).clone().prependTo(s).hide().addClass("KIV-cloned").hide()}var a=e(r).offset(),f=e(r).css("position"),l=e(r).css("left"),c=l==="auto"?parseInt(e(r).css("marginLeft"),10):0,h=function(){return{position:"fixed",left:l-c+"px",width:u.scrollable?u.w-15:u.w,height:u.scrollable?e(window).height()-a.top+"px":u.h,zIndex:u.zindex}}(),p=function(t){i.css(e.extend({},h,t))},d=function(t){i.css({top:t+"px"});if(u.cloned){e(r).css({visibility:"hidden"});i.show()}};u.offsetAnchor&&e("a[name]").each(function(t,n){e(n).css({position:"relative",display:"block",top:"-"+i.outerHeight()+"px"})});var v=function(){if(i.height()>e(window).height()&&!u.scrollable)return!1;var t="",n=e(window).height(),s=i.outerHeight();n<parseInt(a.top+s-Math.abs(e(window).scrollTop())+u.edgeOffset,10)&&!u.fixed&&(t="bottom");e(window).scrollTop()>a.top-u.edgeOffset&&!u.fixed&&(t="top");if(!u.customClass){u.scrollable?p({height:n-a.top+"px",overflow:"auto"}):p();if(t!=="bottom"||u.trigger!=="both"&&u.trigger!=="bottom"||!u.scrollable)if(t!=="top"||u.trigger!=="both"&&u.trigger!=="top")if(u.fixed)i.css({top:u.edgeOffset,left:a.left,height:"auto"});else if(u.scrollable){console.log(a.top);i.css({position:f,top:a.top+"px",height:n-a.top+e(window).scrollTop()+"px"})}else if(u.cloned){e(r).css({visibility:"visible"});i.hide()}else i.removeAttr("style");else u.scrollable?p({height:n+"px",top:u.edgeOffset+"px",overflow:"auto"}):d(u.edgeOffset);else u.scrollable?p({height:n+"px",top:n-s-u.edgeOffset+"px",overflow:"auto"}):d(n-s-u.edgeOffset)}else u.customClass&&(u.trigger==="both"?t==="bottom"||t==="top"?i.addClass(u.customClass+"-"+t):t||i.removeClass(u.customClass+"-top").removeClass(u.customClass+"-bottom"):t===u.trigger?i.addClass(u.customClass+"-"+u.trigger):t||i.removeClass(u.customClass+"-"+u.trigger))},m=function(){i.removeAttr("style");u.w=i.width();u.h=i.height();a=i.offset();v()},g=function(){i.removeAttr("style").off(".sticky");e(window).off(".sticky",m).off(".sticky",v)};i.on("update.sticky",m);i.on("unstick.sticky",g);e(window).on("resize.sticky",i,m).on("scroll.sticky",i,v).trigger("scroll")})}});