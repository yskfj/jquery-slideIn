/*
 *  Slide In 1.0 - jQuery plugin
 *  written by Yosuke Fujii
 *  version 0.0.1
 *  modified 2014/2/13
 *
 *  Copyright (c) 2014 Yosuke Fujii
 *  Licensed under the MIT (MIT-LICENSE.txt)
 *
 *  Built for jQuery library
 *  http://jquery.com
 *
 */
;(function($){
    $.fn.slideIn = function(options){

        // valuables
        var obj,
        zoom=1,
        top,
        left,
        css;

        // load options
        options = $.extend({}, $.fn.slideIn.defaults, options);

        return this.each(function(){

            obj = this;
            css={"visibility":"visible"};

            // hide slide element
            $(options.slideInElement).hide();

            // get zoom
            if(options.zoomedElement){
                var zoomedElementStyle = $(options.zoomedElement).attr("style");
                if( zoomedElementStyle ){
                    zoomedElementStyle.match(/zoom\s*:\s*(.+)\s*;/);
                    if( RegExp.$1 ) zoom = RegExp.$1;
                }
            }
            if(options.debugMode) log('zoom:'+ RegExp.$1);

            // get transition
            if( options.slideInTransition ){
                css["-webkit-transition"]=options.slideInTransition;
                css["-moz-transition"]=options.slideInTransition;
                css["-o-transition"]=options.slideInTransition;
                css["transition"]=options.slideInTransition;
                css["-webkit-transform"]="translate3d(0,0,0)";
            }

            // fix slideInElement position
            var top = $(document).scrollTop();
            top = top / zoom;
            top += options.slideInTop;
            var left = $(window).width();
            left = left / zoom;
            css["position"]="absolute";
            css["top"]= top+"px";
            css["left"]= left+"px";
            if(options.debugMode) log("top: "+css["top"]);
            if(options.debugMode) log("left: "+css["left"]);
            if(options.debugMode) log("transition: "+css["transition"]);
            $(options.slideInElement).css(css);
            $(obj).bind('click.slideIn',function(event){show(event);});
            $(options.closeButtonElement).bind('click.slideIn touchend.slideIn',function(event){hide(event);});
        }); // elements.each

        // private mothods
        function log(str){
            if(options.debugMode && 'console' in window) console.info('jQuery imageZoom: '+ str);
        }
        function bodyWidth(){
            if( isFinite(options.viewPortWidth) && options.viewPortWidth !== 0 ){
                return options.viewPortWidth;
            }else{
                return $(body).width();
            }
        }
        function show(event){
            if(event.stopPropagation){
                event.stopPropagation();
                event.preventDefault();
            } else {
                event.cancelBubble = true;
                event.returnValue = false;
            }
            if(event.handled !== true){
                var top = $(document).scrollTop();
                top = top / zoom;
                top += options.slideInTop;
                css["top"]=top;
                $(options.invisibleElement).css({"overflow":"hidden"});
                $(options.slideInElement).css({"display":"block","top":top+"px"});
                if(options.invisibleBackGround){
                    $(options.invisibleElement).css({"visibility":"hidden"});
                }
                setTimeout(function(){
                    $(options.slideInElement).css({"left":options.slideInLeft+"px"});
                    // $(options.slideInElement).css({"transform":"translate3d(-"+css["left"]+"px, 0, 0)"});
                },300);
                event.handled = true;
            } else {
                return false;
            }
        }
        function hide(event){
            if(event.stopPropagation){
                event.stopPropagation();
                event.preventDefault();
            } else {
                event.cancelBubble = true;
                event.returnValue = false;
            }
            if(event.handled !== true){
                $(options.slideInElement).css(css);
                setTimeout(function(){
                    $(options.invisibleElement).css({"overflow":"visible"});
                    if(options.invisibleBackGround){
                        $(options.invisibleElement).css({"visibility":"visible"});
                    }
                    $(options.slideInElement).hide();
                },500);
                event.handled = true;
            } else {
                return false;
            }
        }

    }; // $.fn.slideIn

    // public methods
    $.slideIn = {};
    $.slideIn.destroy = function(){
        // remove event listener
        $(obj).unbind('click.slideIn touchend.slideIn');
    };

    // default
    $.fn.slideIn.defaults = {
        viewPortWidth: 0,   // 0 calc width;
        slideInElement: '.jq-slide-in-element',  // slide in element class
        slideInTop: 20,     // slide in position
        slideInLeft: 20,    // slide in position
        slideInTransition: 'left 300ms ease-out',   // slide in transition
        closeButtonElement: '.jq-slide-in-close',   // close slide in element
        invisibleElement: 'body',   // this element set to invisible when slide in
        invisibleBackGround: true,    // if set false invisibleElement stay visivle
        zoomedElement: false,   // if you set zoom property, set element selector ex. 'html'
        debugMode: false    // set true more log shows conlose
    };

})(jQuery);