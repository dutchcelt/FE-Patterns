/*! Front-end Patterns Init script 
    
    Copyright (c) 2009-2012 Lunatech Research, Egor Kloos
    
    */

    // INIT
    
    require(["jquery"], function(){
        
        $(document).ready(function() {
        
            //  jQuery UI datapicker (lazyloaded)
            $( ".date,input[name*='date'],input[name*='Date']" ).each(function(){ 
                var $elem = $(this);
                require(["jquery-ui"], function(){
                    $elem.datepicker({ dateFormat: 'dd-mm-yy' }); 
                });
            });
            
            //  jQuery UI button loader (lazyloaded)
            $('body').bind('buttonLoader', function(){
                $(".button,input[type='submit'],button,input[type='button']").each(function(){
                    var $elem = $(this);
                    require(["jquery-ui"], function(){
                        
                        $elem.button();
    
                        // ADDING ICONS TO BUTTONS
                        if($elem.is(".document,.report")){$elem.button({icons:{primary:"ui-icon-document"}});}
                        if($elem.is(".add")){$elem.button({icons:{primary:"ui-icon-plus"}});}
                        if($elem.is(".edit")){$elem.button({icons:{primary:"ui-icon-pencil"}});}
                        if($elem.is(".save")){$elem.button({icons:{primary:"ui-icon-disk"}});}
                        if($elem.is(".save.edit")){$elem.button({icons:{primary:"ui-icon-disk"}},{icons:{secondary:"ui-icon-pencil"}});}
                        if($elem.is(".save.add")){$elem.button({icons:{primary:"ui-icon-disk"}},{icons:{secondary:"ui-icon-plus"}});}
                        if($elem.is(".delete")){$elem.button({icons:{primary:"ui-icon-trash"}});}
                        if($elem.is(".copy")){$elem.button({icons:{primary:"ui-icon-copy"}});}
                        if($elem.is(".subscribe, .unsubscribe")){$elem.button({icons:{primary:"ui-icon-star"}});}
                        if($elem.is("button.comment")){$elem.button({icons:{primary:"ui-icon-comment"}});}
                        if($elem.is(".import")){$elem.button({icons:{primary:"ui-icon-arrowthickstop-1-s"}});}
                        if($elem.is(".restore")){$elem.button({icons:{primary:"ui-icon-arrowthickstop-1-s"}},{icons:{secondary:"ui-icon-folder-open"}});}
                        if($elem.is(".backup")){$elem.button({icons:{primary:"ui-icon-arrowthickstop-1-n"}},{icons:{secondary:"ui-icon-folder-collapsed"}});}
                        if($elem.is(".print")){$elem.button({icons:{primary:"ui-icon-print"}}).click(function(){ window.print() });}
                        if($elem.is(".download")){$elem.button({icons:{primary:"ui-icon-circle-arrow-s"}});}
                        if($elem.is(".done, .checked")){$elem.button({icons:{primary:"ui-icon-check"}});}
                        if($elem.is(".close")){$elem.button({icons:{primary:"ui-icon-closethick"}});}
                        if($elem.is(".cancel,.clear")){$elem.button({icons:{primary:"ui-icon-cancel"}});}
                        if($elem.is(".invite")){$elem.button({icons:{primary:"ui-icon-mail-open"}});}
                        if($elem.is(".search")){$elem.button({icons:{primary:"ui-icon-search"}});}
                        if($elem.is(".timer")){$elem.button({icons:{primary:"ui-icon-clock"}});}
                        if($elem.is(".signin")){$elem.button({icons:{primary:"ui-icon-locked"}});}
                    });
                });
        
            });
    
            //  Accordion (lazyloaded)
            $("#accordion").each(function(){
                var $elem = $(this);
                require(["jquery-ui"], function(){
                    $elem.accordion({ header: "h3", autoHeight: false });
                });
            });
            
            //  Tabs  (lazyloaded)
            $('.tabs').each(function(){
                var $elem = $(this);
                require(["jquery-ui"], function(){
                    $elem.tabs({
                        create: function(event, ui) {
                            //  Lazyload hack!
                            //  .tabs in CSS is set to hidden. 
                            //  Show tabs on creation as to avoid flash of unstyled content
                            $elem.css('visibility','visible');
                        }
                    });
                });
            });    
        
            // Load JavaScript generated UI elements
            $(".button,input[type='submit'],button,input[type='button']").eq(0).each(function(){$('body').trigger('buttonLoader')});
    
            $("tbody").delegate("tr", "hover", function(){
                $('td', this).toggleClass("hover");
            });
            if (!Modernizr.input.placeholder){
                $("input[placeholder]").removeAttr('placeholder');
            }
            
    
        });    
    });    
    