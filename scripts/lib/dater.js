/*! ###########################################################################

 Source:     https://github.com/dutchcelt/dater
 Version:    2.0.1

 Copyright (C) 2011 - 2013,  Lunatech Labs B.V., C. Egor Kloos. All rights reserved.
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
 *   jQuery (tested with 2.0.3)
 *   moment.js (tested with Version: 2.4.0)
 *   Assumes support for the console
 *
 *   Script:
 *   $(document).ready(function(){
 *     $("input").dater();
 *   });
 *
 *   Markup:
 *   <input type="text" id='test' />
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

    "use strict";

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery','moment'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }

})(function ($) {

    "use strict";

    $.fn.dater = function( settings ) {
        // Check for Moment.js!
        if( typeof moment !== "function" ){
            console.error( "The moment.js instance is '"+ typeof moment +"'. Aborting plugin." );
            console.info( "Accessing Moment through the global scope is deprecated" );
            return this;
        }

        // Main script object.
        var daterMasterObject = {
            elem: null,
            defaults: {
                lang: "en",
                format: "DD-MM-YYYY",
                placeholder: false,
                startDate: "01-01-0001",
                endDate: "01-01-9999",
                zIndex: "42",
                firstDayIsMonday: true
            },
            options: function (settings) {
                if( settings.format ) {
                    settings.format.toUpperCase();
                }
                return $.extend({}, this.defaults, settings);
            },
            index: -1,
            templateStore: false,
            template: function () {
                return $('<div class="dater-widget"><header><a class="dater-year dater-year-previous">&#9668;</a><span class="dater-year-header"></span><a class="dater-year dater-year-next">&#9658;</a></header><aside></aside><section></section><footer><a class="dater-today">today</a></footer></div>')
            },
            timer: false,

            day: moment().date(),
            month: moment().month(),
            year: moment().year(),
            newDate : moment(),
            newDateString: "",

            rendered: false,
            initDater: function (elem, settings, index ) {

                this.elem = elem;
                this.index = index;
                this.options = this.options( settings );
                this.template = this.template();
                this.newDate = ( !this.elem.value ) ?  moment() : moment( this.elem.value, this.options.format );
                if( !this.newDate.isValid() ){
                    this.newDate = moment();
                    $( this.elem ).addClass("error").val("Error!");
                }
                this.setDate();

                /* Set the placeholder attribute*/
                if (!this.options.placeholder && typeof $( this.elem ).attr("placeholder")!=="string"){
                    $( this.elem ).prop("placeholder", this.options.format);
                } else if (typeof this.options.placeholder === "string"){
                    $( this.elem ).prop("placeholder", this.options.placeholder);
                }

                /*  Attach events */
                this.events();
            },

            checkDate: function () {
                return this.newDateString;
            },
            setDate: function (f) {
                if( this.newDate.isValid() ){
                    this.day = this.newDate.date();
                    this.month = this.newDate.month();
                    this.year = this.newDate.year();
                    this.newDateString = this.newDate.format( this.options.format );
                }
                if (typeof f === "function") {
                    f(this);
                }
            },
            fader: function () {
                if( this.rendered ){
                    this.rendered = false;
                    var that = this;
                    that.template.fadeOut( 400 , function () {
                        that.template.detach();
                        $( that.elem ).trigger( "blur" );
                    });
                }
            },
            setToToday: function () {
                this.newDate = moment();
                this.setDate(function(that){
                    that.elem.value = that.newDateString;
                    that.highlighter();
                });
            },
            highlighter: function () {
                $('.dater-day,.dater-month', this.template).removeClass('active');
                $( ".today", this.template ).removeClass( "today" );
                //  Highlight the date of today
                if (moment().year() === this.newDate.year() && moment().month() === this.newDate.month()) {
                    $('[data-dater-date]', this.template).eq(moment().date() -1 ).addClass('today');
                }
                // Highlight the date set by the user or preset in the DOM
                if (this.newDate.year() === this.year && this.newDate.month() === this.month && this.elem.value !== "") {
                    $('.dater-day', this.template).eq(this.day - 1).addClass('active');
                }
                if (this.newDate.year() === this.year) {
                    $('.dater-month', this.template).eq(this.newDate.month()).addClass('active');
                }
            },
            update: function( elem ) {
                if ( elem ) {
                    this.setDate();
                    this.elem.value = this.newDateString;
                }
                this.highlighter();
            },
            setPos: function ($instance) {
                var offset = $( this.elem ).offset();
                var bottom = ($instance.outerHeight() + (offset.top + $( this.elem ).outerHeight()) > $('body').outerHeight() );
                $instance.css({position: 'absolute', zIndex: this.options.zIndex, top: offset.top + $( this.elem ).outerHeight(), left: offset.left });
            },
            render: function (f) {

                var renderDate = moment(this.newDate).lang( this.options.lang ).isoWeekday( ( this.options.firstDayIsMonday ) ? 1 : 7 );

                var calMonths = "",
                    calDays = "",
                    calDates = "",
                    remainderOfLastMonth = "",
                    startOfNextMonth = "",
                    daysLength = renderDate.daysInMonth();

                //  Create a list of the Abbriviated month names
                for (var n = 0, l = 12; n < l; n++) {
                    calMonths += '<a data-month="' + n + '" class="dater-month">' + renderDate.lang().monthsShort(moment().month(n),'MMM') + '</a>';
                }
                //  Create a list of days of the week starting with Monday
                for (var n = 0, l = 7; n < l; n++) {
                    calDays += '<span class="dater-days-of-the-week">' +
                        renderDate.lang().weekdaysMin( moment().day( ( (renderDate.isoWeekday()===1) ? ( (n === 6) ? 0 : n + 1 ) : n ) ),'dd') + '</span>';
                }

                //  Create all the days of the month
                for (var x = 0, l = daysLength; x < l; x++) {
                    if ( this.checkRange(x + 1) ) {
                        calDates += '<a class="dater-item dater-day" data-dater-date="' + ( x + 1 ) + '">' + ( x + 1 ) + '</a>';
                    } else {
                        calDates += '<i class="offset dater-day dater-item" data-dater-date="' + ( x + 1 ) + '">' + (x + 1) + '</i>';
                    }
                }
                //  Fill the empty calendar spaces with the date of the adjacent months
                var firstWeekOffset = renderDate.startOf("month").weekday();
                var numberOfDaysLastMonth = renderDate.subtract("month",1).daysInMonth();
                var offset = numberOfDaysLastMonth - firstWeekOffset;
                if ( (numberOfDaysLastMonth - offset) < 7 ) {
                    for (x = offset, l = numberOfDaysLastMonth; x < l; x++) {
                        remainderOfLastMonth += '<i class="offset dater-item">' + x + '</i>';
                    }
                }
                for (x = 0, l = ((Math.ceil((daysLength + firstWeekOffset) / 7)) * 7) - (daysLength + firstWeekOffset); x < l; x++) {
                    startOfNextMonth += '<i class="offset dater-item">' + (x + 1) + '</i>';
                }
                if( this.templateStore ){
                    this.template = this.templateStore;
                }
                //  Add the Year to the template
                $('header span', this.template).html(this.newDate.year());
                //  Add all the calendar days to the template
                $('section', this.template).html(calDays + remainderOfLastMonth + calDates + startOfNextMonth);
                //  Add the Months to the template
                $('aside', this.template).html(calMonths);
                $( ".dater-today", this.template).html( ( this.options.todayString || moment().lang(this.options.lang).calendar().split(" ")[0] ) );
                //  Add the template to the the body
                this.highlighter();
                $('body').append(this.template);


                //  Hide the template
                if (!this.rendered) {
                    this.template.hide();
                    this.setPos(this.template);
                }

                //  Callback
                if (typeof f === "function") {
                    f();
                }
            },
            checkRange: function ( day ) {
                var n = moment( [ this.newDate.year(), this.newDate.month(), day ] );
                var opts = this.options;
                var startDate = moment( opts.startDate, opts.format );
                var endDate = moment( opts.endDate, opts.format );
                return ( n.isAfter( startDate ) && n.isBefore( endDate ) );
            },
            events: function () {

                var dater = this;

                /*  User clicks 'Today' and is done */
                this.template.on('click', '.dater-today', function (event) {
                    dater.setToToday();
                });

                /*  User clicks on a day and is done */
                this.template.on('click', 'a.dater-day', function (event) {
                    dater.newDate.set( "date", $(event.target).data("dater-date") );
                    dater.update($(event.target));
                    $( dater.elem ).trigger( "blur" );
                });
                this.template.on('mousedown', '.dater-item,.dater-days-of-the-week', function (event) {
                    event.preventDefault();
                });

                /*  User clicks on a month and can continue */
                this.template.on('mousedown', '.dater-month', function (event) {
                    event.preventDefault();
                    dater.newDate.set( "month", $(this).data('month') );
                    dater.year = dater.newDate.year();
                    dater.render();
                    $( dater.elem ).trigger( "focus" );
                });

                /*  User sets year and can continue */
                this.template.on('mousedown', '.dater-year', function ( event ) {
                    event.preventDefault();
                    if ($(this).is('.dater-year-next')) {
                        dater.newDate.add( "y", 1 );
                    } else {
                        dater.newDate.subtract( "y", 1 );
                    }
                    dater.render();
                    $( dater.elem ).trigger( "focus" );
                });

                /*  Input element is focus, show the datepicker */
                $( this.elem ).on('focus', function (e) {
                    event.preventDefault();
                    clearTimeout(dater.timer);
                    $( this ).removeClass("error")
                    if( ( $(this).val() !== dater.newDateString ) ){
                        dater.newDate = moment( $(this).val(), dater.options.format );
                        if( !dater.newDate.isValid() ){
                            $(this).val("");
                            dater.newDate = moment();
                        } else {
                            dater.update();
                        }
                    }
                    $(this).trigger('render.dater');
                });

                /*  Render the detepicker */
                $( this.elem ).on('render.dater', function (event) {
                    if (dater.template.is(":visible") === false) {
                        dater.render(function () {
                            dater.template.fadeIn('fast');
                            dater.rendered = true;
                        });
                    }
                });

                /*  Hide the datepicker */
                $( this.elem ).on("blur", function (event) {
                    if( dater.rendered ){
                        dater.timer = setTimeout( dater.fader() , 100 ) ;
                    }
                });
            }
        };

        return this.each( function( index, domElem ) {

            var dater = Object.create( daterMasterObject );
            dater.initDater( domElem, settings, index );

        });
    };

});
