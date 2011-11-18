/*  ###########################################################################
    Author:     Lunatech Research
    ########################################################################### */
    
    $(document).ready(function() {
    
        //  jQuery UI datapicker (lazyloaded)
        $( "input[name*='date'],input[name*='Date']" ).each(function(){ 
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
                    if($elem.is(".open")){$elem.button().click(function(){$(this).closest('.quick-add').find('.objectForm').toggle('slow');});}
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
                $elem.tabs();
            });
        });
        
        //  DATATABLE (lazyloaded)
        $(".datatable").each(function(){
            var $elem = $(this);
            require(["datatables"], function(){
                $elem.dataTable( {
                    "bJQueryUI": true,
                    "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                    "iDisplayLength": 5,
                    "bLengthChange": true,
                    "sPaginationType": "full_numbers",
                    "aoColumns": [ null, null, null, { "bSortable": false } ]
                });
            });
        });
        
        
        // LOAD FLASH OBJECT (SWF FILE)
        $("object > param[value$='swf']").each(function(index){
            var f = $(this).closest('object').attr('id');
            function regOb(f){ swfobject.registerObject(f, "9.0.0", "scripts/swfobject/expressInstall.swf");}
            if (index>0) { regOb(f); } else { $.getScript("scripts/swfobject/swfobject.js",function(){ regOb(f); }); }
        });

        // Load JavaScript generated UI elements
        $('body').each(function(){$(this).trigger('buttonLoader')});

        $("tbody").delegate("tr", "hover", function(){
            $('td', this).toggleClass("hover");
        });
        if (!Modernizr.input.placeholder){
            $("input[placeholder]").removeAttr('placeholder');
        }
        
        $("canvas.dummy").each(function(){
            var el = $(this).get()[0];
            var ctx = el.getContext('2d');
            ctx.fillStyle = '#08f';
            function chart( x, w, val ) {
              ctx.beginPath();
              ctx.rect(x,200-val,w,val);
              ctx.fill();
            }
            var w=5;
            for (var x=0; x < 500; x+=w) {
              chart( x, w, 200*Math.random() );
            }
        });

    });    
    
    define("init", function(){});
