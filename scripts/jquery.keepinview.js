/*  ###########################################################################
    Author:     Lunatech
    date:       October 2011
    ########################################################################### */

    // STICKY ELEMENTS (FIXED ON SCROLL)
    $.fn.keepInView = function(topOffset) {
        topOffset = (topOffset) ? topOffset : 24;
        var element = $(this);
        var offset = element.offset();
        var cssPosition = {
            type: element.css('position'),
            top: element.css('top'),
            left: element.css('left')
        }
        var elementWidth = element.width();
        var marginOffset = (cssPosition.left=="auto") ? parseInt(element.css('marginLeft')) : 0;
        $(window).bind('scroll',function(){
            if( ($('body').scrollTop())+topOffset > offset.top ) { 
                element.css({ 
                    position: 'fixed',
                    top:      topOffset+'px',
                    left:     offset.left-marginOffset+'px',
                    width:    elementWidth 
                });
            } else { 
                element.css({ 
                    position: cssPosition.type,
                    top:      cssPosition.top,
                    left:     cssPosition.left 
                });
            }
        });
        return this;
    };
