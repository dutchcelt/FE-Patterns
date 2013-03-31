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
(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){e.fn.keepInView=function(t){return this.each(function(){var n=e(this),r={fixed:!1,edgeOffset:0,zindex:n.css("zIndex"),customClass:!1,trigger:"both",h:n.height(),w:n.width()},i=e.extend(r,t),s=n.offset(),o=n.css("left"),u=o==="auto"?parseInt(n.css("marginLeft"),10):0,a=function(){n.css({position:"fixed",left:o-u+"px",width:i.w,height:i.h,zIndex:i.zindex})},f=function(e){n.css({top:e+"px"})},l=function(){if(n.height()>e(window).height())return!1;var t="";e(window).height()<parseInt(s.top+n.outerHeight()-Math.abs(e(window).scrollTop())+i.edgeOffset,10)&&!i.fixed&&(t="bottom");e(window).scrollTop()>s.top-i.edgeOffset&&!i.fixed&&(t="top");if(!i.customClass){a();t!=="bottom"||i.trigger!=="both"&&i.trigger!=="bottom"?t!=="top"||i.trigger!=="both"&&i.trigger!=="top"?i.fixed?n.css({top:i.edgeOffset,left:s.left}):n.removeAttr("style"):f(i.edgeOffset):f(e(window).height()-n.outerHeight()-i.edgeOffset)}else i.customClass&&(i.trigger==="both"?t==="bottom"||t==="top"?n.addClass(i.customClass+"-"+t):t||n.removeClass(i.customClass+"-top").removeClass(i.customClass+"-bottom"):t===i.trigger?n.addClass(i.customClass+"-"+i.trigger):t||n.removeClass(i.customClass+"-"+i.trigger))},c=function(){n.removeAttr("style");i.w=n.width();i.h=n.height();s=n.offset();l()},h=function(){n.removeAttr("style").off(".sticky");e(window).off(".sticky",c).off(".sticky",l)};n.on("update.sticky",c);n.on("unstick.sticky",h);e(window).on("resize.sticky",n,c).on("scroll.sticky",n,l).trigger("scroll")})}});