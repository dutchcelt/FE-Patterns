var fepTabs=function($fepElements){$(".tabs-tab:first",$fepElements).addClass("active");$($fepElements).on("click",".tabs-tab-link",function(event){event.preventDefault();$(".tabs-tab",$fepElements).removeClass("active");$(event.target).closest(".tabs-tab").addClass("active");$(".target",event.delegateTarget).removeClass("target").show();$(this.hash).show(0,function(){var h=$(this).outerHeight()+120;$(event.delegateTarget).css("height",h+"px")});$(".tabs-pane",event.delegateTarget).not(this.hash).hide()});$(".tabs-tab:first .tabs-tab-link",$fepElements).trigger("click")};(function(FEP,$){FEP.fakeCanvas=function(elem){var module={paint:function(){var el=elem.get()[0];var ctx=el.getContext("2d");ctx.fillStyle="#08f";function chart(x,w,val){ctx.beginPath();ctx.rect(x,200-val,w,val);ctx.fill()}var w=5;for(var x=0;x<500;x+=w){chart(x,w,200*Math.random())}}};return{run:module.paint}}})(FEP,jQuery);