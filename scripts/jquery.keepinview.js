/*  ###########################################################################
    Author:     Lunatech
    date:       October 2011
    ########################################################################### */

    (function($){
  
        // STICKY ELEMENTS (FIXED ON SCROLL)
        
        $.fn.keepInView = function(orientation,edgeOffset) {
            edgeOffset = (edgeOffset) ? edgeOffset : 0;
            var element = $(this);
            var offset = element.offset();
            var cssPosition = {
                type: element.css('position'),
                top: element.css('top'),
                left: element.css('left')
            }
            var marginOffset = (cssPosition.left=="auto") ? parseInt(element.css('marginLeft')) : 0;
            var h = element.height(),
                w = element.width();
            
            var setCSS = function(){
                element.css({ 
                    position: 'fixed',
                    left:       offset.left-marginOffset+'px',
                    width:      w,
                    height:     h 
                });
            }
            var fixCSS = function(t){
                element.css({ 
                    top:        t+'px'
                });
            }
            var clearCSS = function(){
                element.css({ 
                    position:   cssPosition.type,
                    left:       cssPosition.left,
                    top:        cssPosition.top 
                });
            }
            
            function setElem(){
                setCSS();
                if (orientation==="bottom" && offset.top !=0) {
                    if( $(window).height() < parseInt(offset.top + element.outerHeight() - Math.abs($(window).scrollTop())+edgeOffset) ) { 
                        fixCSS(($(window).height()-element.outerHeight()-edgeOffset));
                    } else { 
                        clearCSS();
                    }
                } else if (orientation==="top" && offset.top !=0) {
                    if( ($(window).scrollTop())+edgeOffset > offset.top ) { 
                        fixCSS(topOffset);
                    } else { 
                        clearCSS();
                    }
                }
            }
            
            $(window).bind('resize scroll',function(){
                setElem();
            }).trigger('scroll');
            
        }
    
    })(jQuery);   
