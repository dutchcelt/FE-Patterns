/*! ###########################################################################
    
    Source:     https://github.com/dutchcelt/dater
    Version:    1.4
    
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
    
    
    *   USAGE:
    *   
    *   Requirements:
    *   jQuery (tested with 1.8)
    *   date.js (tested with Version: 1.0 Alpha-1)
    *   
    *   Script:
    *   $(document).ready(function(){
    *     $("input").dater();
    *   });
    *   
    *   Markup:
    *   <input type="text" id='test' />
    *   <input type="text" placeholder="day-month-year" />
    *   <input type="text" value="29-03-2014" />
    *   
    *   $("input").dater({firstDayIsMonday:false}); // Set Monday or Sunday as the first day of the week.
    *   $("input").dater({format:"mm-dd-yyyy"}); // alternative date formats
    *   $("input").dater({startDate:"mm-dd-yyyy", endDate: "mm-dd-yyyy"}); // Restict selection between Date ranges
    *   $("input").dater({placeholder:"day-month-year"}); // set or override the placeholder attribute
    *   $("input").dater({zIndex:"42"}); // set the CSS z-index property
    *   
    *   
    
    ########################################################################### */(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){e.fn.dater=function(t){return this.each(function(r,i){var s=e(this),o=e('<div class="dater-widget" id="daterWidget'+r+'"><header><a class="dater-year-previous">&#9668;</a><span></span><a class="dater-year-next">&#9658;</a></header><aside></aside><section></section><footer><a class="dater-today">today</a></footer></div>'),u={format:"dd-MM-yyyy",placeholder:!1,startDate:!1,endDate:!1,zIndex:"424242",firstDayIsMonday:!0},a=e.extend(u,t),f=Date.parse(s.val())===null?Date.today():Date.parse(s.val()),c=e.data(s,"dater",{day:f.getDate(),month:f.getMonth(),year:f.getFullYear()}),h=f.toString(a.format),p,d=!1,v=function(e,t){c.day=e.getDate();c.month=e.getMonth();c.year=e.getFullYear();typeof t=="function"&&t()},m=function(){o.fadeOut("fast",function(){e(this).detach()});d=!1;s.val()!==""&&Date.parse(s.val())!==null&&(h=s.val())},g=function(e){var t=new Date(c.year,c.month,e),n=Date.parse(a.startDate)===null?new Date(1970,1,1):Date.parseExact(a.startDate,a.format),r=Date.parse(a.endDate)===null?new Date(2070,1,1):Date.parseExact(a.endDate,a.format);return t.between(n,r)},y=function(t,i){var s=new Date(c.year,c.month,c.day);e(".dater-widget:not('#daterWidget"+r+"')").detach();var o="",u="",f="",h="",p="",v=Date.getDaysInMonth(c.year,c.month);for(n=0,l=Date.CultureInfo.abbreviatedMonthNames.length;n<l;n++)o+='<a data-month="'+n+'" class="dater-month">'+Date.CultureInfo.abbreviatedMonthNames[n]+"</a>";for(n=0,l=Date.CultureInfo.firstLetterDayNames.length;n<l;n++)u+="<span>"+Date.CultureInfo.firstLetterDayNames[a.firstDayIsMonday?n===6?0:n+1:n]+"</span>";for(x=0,l=v;x<l;x++)g(x+1)?f+='<a class="dater-item dater-day">'+(x+1)+"</a>":f+='<i class="offset dater-item">'+(x+1)+"</i>";var m=Date.getDayNumberFromName(s.moveToFirstDayOfMonth().toString("ddd"));a.firstDayIsMonday&&(m=m===0?6:m-1);var y=s.add({month:-1}),b=y.getDaysInMonth(),S=b-m;for(x=S,l=b;x<l;x++)h+='<i class="offset dater-item">'+(x+1)+"</i>";for(x=0,l=Math.ceil((v+m)/7)*7-(v+m);x<l;x++)p+='<i class="offset dater-item">'+(x+1)+"</i>";e("header span",t).html(c.year);e("section",t).html(u+h+f+p);e("aside",t).html(o);e("body").append(t);if(!d){t.hide();E(t)}w();E(t);typeof i=="function"&&i()},b=function(e){var t=new Date(c.year,c.month,c.day);s.val(t.toString(a.format));e&&e.addClass("active");w()},w=function(){e(".dater-day,.dater-month",o).removeClass("active");var t=Date.parseExact(h,a.format);Date.today().getFullYear()===c.year&&Date.today().getMonth()===c.month&&e("section a",o).eq(Date.today().getDate()-1).addClass("today");t.getFullYear()===c.year&&t.getMonth()===c.month&&s.val()!==""&&e("section a",o).eq(c.day-1).addClass("active");s.val()!==""&&e(".dater-month",o).eq(c.month).addClass("active");clearTimeout(p)},E=function(t){var n=s.offset(),r=t.outerHeight()+(n.top+s.outerHeight())>e("body").outerHeight();t.css({position:"absolute",zIndex:a.zIndex,top:n.top+s.outerHeight(),left:n.left})};!a.placeholder&&typeof s.attr("placeholder")!="string"?s.attr("placeholder",a.format.toLowerCase()):typeof a.placeholder=="string"&&s.attr("placeholder",a.placeholder);if(s.val()!==""){var S=(new Date).set(c);s.val(S.toString(a.format))}o.on("click",".dater-today",function(e){v(Date.today());s.val(Date.today().toString(a.format));w();m()});o.on("click",".dater-day",function(t){c.day=parseInt(e(t.target).html(),10);b(e(t.target));m()});o.on("click",".dater-month",function(t){c.month=e(this).data("month");y(o);s.focus()});o.on("click","header a",function(t){e(this).is(".dater-year-next")?c.year=c.year+1:c.year=c.year-1;e("header span",o).html(c.year);y(o);s.focus()});o.on("click",".offset, span, header, footer, aside",function(e){clearTimeout(p);s.focus()});s.on("focus",function(t){var n=Date.parseExact(e(this).val(),a.format);n===null&&!d&&v(Date.today());(e(this).val()===""||n!==null)&&e(this).trigger("render.dater");clearTimeout(p)});s.on("render.dater",function(t){e("#daterWidget"+r).is(":visible")===!1&&y(o,function(){o.fadeIn("fast");d=!0})});s.on("change",function(t){var n=Date.parse(e(this).val());if(n===null){e(this).val("");v(Date.today())}n!==null&&v(n,function(){var e=(new Date).set(c);s.val(e.toString(a.format));b();s.trigger("blur")})});s.on("blur",function(e){p=setTimeout(m,200)})})}});