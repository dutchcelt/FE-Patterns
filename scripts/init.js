/*  ###########################################################################
    Author:     Lunatech Research
    ########################################################################### */
    
    $(document).ready(function() {
    
        // LOAD FLASH OBJECT (SWF FILE)
        $("object > param[value$='swf']").each(function(index){
            var f = $(this).closest('object').attr('id');
            function regOb(f){ swfobject.registerObject(f, "9.0.0", "scripts/swfobject/expressInstall.swf");}
            if (index>0) { regOb(f); } else { $.getScript("scripts/swfobject/swfobject.js",function(){ regOb(f); }); }
        });

        $( "input[name*='date'],input[name*='Date'],.date" ).each(function(){$(this).datepicker({ dateFormat: 'dd-mm-yy' })});
        $(".button,[type=submit],button,[type=button]").button();
                
        // ADDING ICONS TO BUTTONS
        $(".add").button({icons:{primary:"ui-icon-plus"}});
        $(".edit").button({icons:{primary:"ui-icon-pencil"}});
        $(".save").button({icons:{primary:"ui-icon-disk"}});
        $(".save.edit").button({icons:{primary:"ui-icon-disk"}},{icons:{secondary:"ui-icon-pencil"}});
        $(".save.add").button({icons:{primary:"ui-icon-disk"}},{icons:{secondary:"ui-icon-plus"}});
        $(".delete").button({icons:{primary:"ui-icon-trash"}});
        $(".cancel").button({icons:{primary:"ui-icon-cancel"}});
        $(".restore").button({icons:{primary:"ui-icon-arrowthickstop-1-s"}},{icons:{secondary:"ui-icon-folder-collapsed"}});
        $(".backup").button({icons:{primary:"ui-icon-arrowthickstop-1-n"}},{icons:{secondary:"ui-icon-folder-open"}});
        $(".print").button({icons:{primary:"ui-icon-print"}}).click(function(){ window.print() });
                
        $("tbody").delegate("tr", "hover", function(){
            $('td', this).toggleClass("hover");
        });
        if (!Modernizr.input.placeholder){
            $("input[placeholder]").removeAttr('placeholder');
        }
        
        // Accordion
        $("#accordion").each(function(){
          $(this).accordion({ header: "h3", autoHeight: false });
        });
        
        // Tabs
        $('.tabs').each(function(){
          $(this).tabs();
        })
        
        
        $(".datatable").each(function(){
            $(this).dataTable( {
                "bJQueryUI": true,
                "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
                "iDisplayLength": 5,
                "bLengthChange": true,
                "sPaginationType": "full_numbers",
                "aoColumns": [ null, null, null, { "bSortable": false } ]
            });
        });
    
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
