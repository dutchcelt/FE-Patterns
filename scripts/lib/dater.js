/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
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
    
        $.fn.dater = function(settings) {
            
            return this.each(function(index,domElem) {
            
                var $elem       = $(this),
                    $template   = $('<div class="dater-widget" id="daterWidget'+index+'"><header><a class="dater-year-previous">&#9668;</a><span></span><a class="dater-year-next">&#9658;</a></header><aside></aside><section></section><footer><a class="dater-today">today</a></footer></div>'),
                    defaults    = { today: new Date.today(),
                                    thisDate: ($elem.val()==="") ? Date.today() : Date.parse($elem.val()),
                                    format: "dd-MM-yyyy",
                                    placeholder: ""
                                  },
                    options     = $.extend(defaults, settings);
                
                var dateStr     = function(date,format){
                                    return date.toString(format);
                                  },
                    dateIndex   = function(date,format){
                                    return Number(date.toString(format))-1;
                                  },
                    fadeOut     = function($widget){
                                    $widget = ($widget) ? $widget : $template;
                                    $widget.fadeOut('fast',function(){
                                        $(this).detach();
                                    });
                                    rendered = false;
                                  },
                    monthIndex  = Date.getMonthNumberFromName(options.thisDate.toString('MMMM')),
                    timer,
                    rendered    = false;
                    
                    
                var updatePicker = function(elem,selector){
                    highlightDate(options.thisDate);
                    $elem.val(dateStr(options.thisDate,options.format));
                    elem.addClass('active');
                }
                var render = function($instance,f){
                    $(".dater-widget:not('daterWidget"+index+"')").detach();
                    var calMonths   = "",
                        calDays     = "";
                    for (n in Date.CultureInfo.abbreviatedMonthNames) {
                        calMonths += '<a data-month="'+n+'">'+Date.CultureInfo.abbreviatedMonthNames[n]+'</a>';
                    }
                    var getDay = function(day){
                        var date = (day < 10 ? '0' : '') + day + dateStr(options.thisDate,".MMM.yyyy");
                        var dayNum = Date.getDayNumberFromName(Date.parse(date).toString("ddd"));
                        return dayNum;
                    }
                    for (n = 0, l = Date.CultureInfo.firstLetterDayNames.length; n < l; n++) {
                        calDays += '<span>'+Date.CultureInfo.firstLetterDayNames[((n==6)?0:n+1)]+'</span>';
                    }
                    for (x=0,l=Date.getDaysInMonth(dateIndex(options.thisDate,'yyyy')+1,dateIndex(options.thisDate,'MM')); x<l; x++) {
                        calDays += '<a data-day="'+getDay(x+1)+'">'+(x+1)+'</a>';
                    }
                    $('header span',$template).html(dateStr(options.thisDate,"yyyy"));
                    $('section',$instance).html(calDays);
                    $('aside',$instance).html(calMonths);
                    $('body').append($instance);
                    $instance.hide();   
                    $('section a:first').addClass('first');
                    highlightDate(options.thisDate);
                    setPos($instance);
                    if (typeof f == "function") { f(); }
                }
                var highlightDate = function(date){
                    $('[data-day],[data-month]',$template).removeClass('active');
                    $('[data-day]',$template).eq(dateIndex(date,"dd")).addClass('active');
                    $('[data-month]',$template).eq(dateIndex(date,"MM")).addClass('active');
                    $('header span',$template).html(dateStr(options.thisDate,"yyyy"));
                    clearTimeout(timer);
                    }
                var setPos = function($instance){
                    var offset = $elem.offset();
                    var bottom = ($instance.outerHeight()+(offset.top + $elem.outerHeight()) > $('body').outerHeight() );
                    //  console.log(bottom)
                    $instance.css({position: 'absolute', zIndex: '4242', top: offset.top + $elem.outerHeight(), left: offset.left });
                }
                if (typeof $elem.attr("placeholder") != 'string'){
                    $elem.attr("placeholder",((options.placeholder==="") ? options.format.toLowerCase() : options.placeholder) );
                }
                
                //  EVENTS
                $template.on('click',function(e){
                    e.stopPropagation();
                });
                $template.on('click','.dater-today',function(e){
                    e.preventDefault();
                    $elem.val(dateStr(options.today,options.format));
                    highlightDate(options.today);
                    fadeOut($(e.delegateTarget));
                    return false;
                });
                $template.on('click','[data-day]',function(e){
                    e.preventDefault();
                    options.thisDate.set({day:Number($(this).text())});
                    updatePicker($(this));
                    fadeOut($(e.delegateTarget));
                    return false;
                });
                $template.on('click','[data-month]',function(e){
                    e.preventDefault();
                    options.thisDate.set({month:Date.getMonthNumberFromName($(this).text())});
                    updatePicker($(this));
                    $elem.focus();
                    return false;
                });
                $template.on('click','header a',function(e){
                    e.preventDefault();
                    if($(this).is('.dater-year-next')){
                        options.thisDate.addYears(1);
                    } else {
                        options.thisDate.addYears(-1);
                    }
                    $elem.val(dateStr(options.thisDate,options.format));
                    highlightDate(options.thisDate);
                    $elem.focus();
                });
                $template.on('mouseout',function(e){
                    e.preventDefault();
                    timer = setTimeout(fadeOut,800);
                });
                $template.on('mouseover',function(e){
                    e.preventDefault();
                    console.log('over');
                    clearTimeout(timer);
                    
                });
                $elem.on('focus focus.dater',function(e){
                    $(this).trigger('render.dater');
                });
                $elem.on('click render.dater',function(e){
                    e.preventDefault();
                    if($("#daterWidget"+index).is(":visible")==false){
                        render($template, function(){
                            $template.fadeIn('fast');
                            rendered = true;
                        });
                    }
                });
                $elem.on('change',function(e){
                    options.thisDate = Date.parse($(this).val());
                });
                $elem.on('mouseout',function(e){
                    timer=setTimeout(fadeOut, 800);
                });
                
            });
        };
        
    }));