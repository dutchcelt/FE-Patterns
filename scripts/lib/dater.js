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

    ########################################################################### */


    (function (factory) {

        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['jquery'], factory);
        } else {
            // Browser globals
            factory(jQuery);
        }

    }(function ($) {

        var daterMasterObject = {
            elem: null,
            defaults: { format: "dd-MM-yyyy",
                placeholder:false,
                startDate: false,
                endDate: false,
                zIndex: "424242",
                firstDayIsMonday: true
            },
            options: function( settings ){
                return $.extend( {}, this.defaults, settings );
            },
            index:30,
            template: function(){
                return $('<div class="dater-widget" id="daterWidget'+ this.index +'"><header><a class="dater-year-previous">&#9668;</a><span></span><a class="dater-year-next">&#9658;</a></header><aside></aside><section></section><footer><a class="dater-today">today</a></footer></div>')
            },
            timer: false,
            rendered: false,
            date: function(){
                return (Date.parse(this.elem.val())===null) ? Date.today() : Date.parse(this.elem.val())
            },
            data: function(){
                return $.data(this.elem,'dater',{day: this.date().getDate(),month: this.date().getMonth(), year: this.date().getFullYear()});
            },
            checkDate: function(){
                return this.date().toString(this.options.format);
            },
            setData: function(date,f){
                this.data.day   = date.getDate();
                this.data.month = date.getMonth();
                this.data.year  = date.getFullYear();
                if (typeof f === "function") { f(); }
            },
            fadeOut: function(){
                this.template.fadeOut('fast',function(){
                    $(this).detach();
                });
                this.rendered = false;
                if(this.elem.val()!=="" &&  Date.parse(this.elem.val())!==null) {
                    this.checkDate = this.elem.val();
                }
            },
            setToToday: function(){
                this.setData(Date.today());
                this.elem.val(Date.today().toString(this.options.format));
                this.show();
                this.fadeOut();
            },
            show: function(){
                $('.dater-day,.dater-month',this.template).removeClass('active');
                var date = Date.parseExact(this.checkDate,this.options.format);
                //  Highlight the date of today
                if(Date.today().getFullYear() === this.data.year && Date.today().getMonth() === this.data.month) {
                    $('section a',this.template).eq(Date.today().getDate()-1).addClass('today');
                }
                // Highlight the date set by the user or preset in the DOM
                if(date.getFullYear() === this.data.year && date.getMonth() === this.data.month && this.elem.val()!=="") {
                    $('section a',this.template).eq(this.data.day-1).addClass('active');
                }
                if ( this.elem.val()!=="" ) {
                    $('.dater-month',this.template).eq(this.data.month).addClass('active');
                }
                clearTimeout(this.timer); // Prevent the datepicker from detaching
            },
            update: function(elem){
                var date = new Date(this.data.year,this.data.month,this.data.day);
                this.elem.val(date.toString(this.options.format));
                if (elem) { elem.addClass('active'); }
                this.show();
            },
            setPos: function($instance) {
                var offset = this.elem.offset();
                var bottom = ($instance.outerHeight()+(offset.top + this.elem.outerHeight()) > $('body').outerHeight() );
                $instance.css({position: 'absolute', zIndex: this.options.zIndex, top: offset.top + this.elem.outerHeight(), left: offset.left });
            },
            render: function( f ){

            var newdate = new Date(this.data.year,this.data.month,this.data.day);

            //  Clear all other datepickers, except this one
            $(".dater-widget:not('#daterWidget"+this.index+"')").detach();
            var calMonths   = "",
                calDays     = "",
                calDates    = "",
                remainderOfLastMonth="",
                startOfNextMonth="",
                daysLength  = Date.getDaysInMonth(this.data.year,this.data.month);

            //  Create a list of the Abbriviated month names
            for (n=0, l = Date.CultureInfo.abbreviatedMonthNames.length; n<l; n++) {
                calMonths += '<a data-month="'+n+'" class="dater-month">'+Date.CultureInfo.abbreviatedMonthNames[n]+'</a>';
            }

            //  Create a list of days of the week starting with Monday
            for (n = 0, l = Date.CultureInfo.firstLetterDayNames.length; n < l; n++) {
                calDays += '<span>'+Date.CultureInfo.firstLetterDayNames[( (this.options.firstDayIsMonday) ? ( (n===6) ? 0 : n+1 ) : n )]+'</span>';
            }

            //  Create all the days of the month
            for (x=0,l=daysLength; x<l; x++) {
                if(this.checkRange(x+1)) {
                    calDates += '<a class="dater-item dater-day">'+(x+1)+'</a>';
                } else {
                    calDates += '<i class="offset dater-item">'+(x+1)+'</i>';
                }

            }

            //  Fill the empty calendar spaces with the date of the adjacent months
            var firstWeekOffset = Date.getDayNumberFromName(newdate.moveToFirstDayOfMonth().toString('ddd'));
            //  First day of the week is monday.
            if (this.options.firstDayIsMonday){
                firstWeekOffset = (firstWeekOffset===0)?6:firstWeekOffset-1;
            }
            var lastMonth = newdate.add({month: -1});
            var numberOfDaysLastMonth = lastMonth.getDaysInMonth();
            var offset = numberOfDaysLastMonth - firstWeekOffset ;
            for (x=offset,l=numberOfDaysLastMonth; x<l; x++) {
                remainderOfLastMonth += '<i class="offset dater-item">'+(x+1)+'</i>';
            }
            for (x=0,l=((Math.ceil((daysLength + firstWeekOffset) /7))*7)-(daysLength + firstWeekOffset); x<l; x++) {
                startOfNextMonth += '<i class="offset dater-item">'+(x+1)+'</i>';
            }

            //  Add the Year to the template
            $('header span',this.template).html(this.data.year);
            //  Add all the calendar days to the template
            $('section',this.template).html(calDays + remainderOfLastMonth + calDates + startOfNextMonth);
            //  Add the Months to the template
            $('aside',this.template).html(calMonths);
            //  Add the template to the the body
            $('body').append(this.template);
            //  Hide the template
            if(!this.rendered){
                this.template.hide();
                this.setPos(this.template);
            }
            this.show();
            this.setPos(this.template);
            //  Callback
            if (typeof f === "function") { f(); }
            },
            checkRange: function(day){
                var newdate = new Date(this.data.year,this.data.month,day);
                var startDate = (Date.parse(this.options.startDate)===null) ? new Date(1970,1,1) : Date.parseExact(this.options.startDate,this.options.format);
                var endDate = (Date.parse(this.options.endDate)===null) ? new Date(2070,1,1) : Date.parseExact(this.options.endDate,this.options.format);
                return newdate.between(startDate,endDate);

            },
            events: function(){

                var dater = this;

                //  User clicks 'Today' and is done
                this.template.on('click','.dater-today',function(e){
                    dater.setToToday();
                });

                //  User clicks on a day and is done
                this.template.on('click','.dater-day',function(e){
                    dater.data.day = parseInt($(e.target).html(),10);
                    dater.update($(e.target));
                    dater.fadeOut();
                });

                //  User clicks on a month and can continue
                this.template.on('click','.dater-month',function(e){
                    dater.data.month = $(this).data('month');
                    dater.render();
                    dater.elem.focus();
                });

                //  User sets year and can continue
                this.template.on('click','header a',function(e){
                    if($(this).is('.dater-year-next')){
                        dater.data.year = dater.data.year + 1;
                    } else {
                        dater.data.year = dater.data.year - 1;
                    }
                    $('header span',dater.template).html(dater.data.year);

                    dater.render();
                    dater.elem.focus();
                });

                //  Pointer device (re)enters the datepicker: Prevent detaching the datepicker
                this.template.on('click','.offset, span, header, footer, aside',function(e){
                    clearTimeout(dater.timer);
                    dater.elem.focus();
                });

                //  Input element is focus, show the datepicker
                this.elem.on('focus',function(e){
                    var date = Date.parseExact($(this).val(),dater.options.format);
                    if(date===null && !dater.rendered){
                        dater.setData(Date.today());
                    }
                    if(($(this).val()==="" || date!==null)){
                        $(this).trigger('render.dater');
                    }
                    clearTimeout(dater.timer);
                });

                //  Render the detepicker
                this.elem.on('render.dater',function(e){
                    if($("#daterWidget"+dater.index).is(":visible")===false){
                        dater.render( function(){
                            dater.template.fadeIn('fast');
                            dater.rendered = true;
                        });
                    }
                });

                //  Set the input value
                this.elem.on('change',function(e){
                    var date = Date.parse($(this).val());
                    if(date===null){
                        $(this).val("");
                        dater.setData(Date.today());
                    }
                    if(date!==null){
                        dater.setData(date, function(){
                            var newdate = new Date().set(dater.data);
                            dater.elem.val(newdate.toString(dater.options.format));
                            dater.update();
                            dater.elem.trigger('blur');
                        });
                    }
                });

                //  Hide the datepicker
                this.elem.on('blur',function(e){
                    dater.timer=setTimeout( dater.fadeOut(), 200);
                });
            }
        };

        $.fn.dater = function(settings) {

            return this.each(function( index, domElem ) {

                var dater = Object.create( daterMasterObject );

                    dater.options = dater.options( settings );
                    dater.elem = $( domElem );
                    dater.index = index;

                    dater.template = dater.template();
                    dater.data = dater.data();
                    dater.checkDate = dater.checkDate();


                // Set the placeholder attribute
                if (!dater.options.placeholder && typeof dater.elem.attr("placeholder")!=="string"){
                    dater.elem.attr("placeholder", dater.options.format.toLowerCase());
                } else if (typeof dater.options.placeholder ==="string"){
                    dater.elem.attr("placeholder", dater.options.placeholder);
                }

                //  if by any chance a preset date doesn't have a numerical format then convert it.
                if(dater.elem.val()!==""){
                    var newdate = new Date().set(dater.data);
                    dater.elem.val(newdate.toString(dater.options.format));
                }

                //  EVENTS
                dater.events();

            });
        };

    }));
