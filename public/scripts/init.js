/*! Front-end Patterns Init script 
    https://github.com/dutchcelt/Keep-in-View
    
    Copyright (c) 2009-2011 Lunatech Research, Egor Kloos
    
    * Modernizr and jQuery are included to reduce the number HTML of static script tags in the  HTML file.
    * Also both scripts need to load well before any of the other dependencies.
    */


    /*!
     * Modernizr v2.0.6
     * http://www.modernizr.com
     *
     * Copyright (c) 2009-2011 Faruk Ates, Paul Irish, Alex Sexton
     * Dual-licensed under the BSD or MIT licenses: www.modernizr.com/license/
     */
    window.Modernizr=(function(window,document,undefined){var version="2.0.6",Modernizr={},enableClasses=true,docElement=document.documentElement,docHead=document.head||document.getElementsByTagName("head")[0],mod="modernizr",modElem=document.createElement(mod),mStyle=modElem.style,inputElem=document.createElement("input"),smile=":)",toString=Object.prototype.toString,prefixes=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),domPrefixes="Webkit Moz O ms Khtml".split(" "),ns={svg:"http://www.w3.org/2000/svg"},tests={},inputs={},attrs={},classes=[],featureName,injectElementWithStyles=function(rule,callback,nodes,testnames){var style,ret,node,div=document.createElement("div");if(parseInt(nodes,10)){while(nodes--){node=document.createElement("div");node.id=testnames?testnames[nodes]:mod+(nodes+1);div.appendChild(node);}}style=["&shy;","<style>",rule,"</style>"].join("");div.id=mod;div.innerHTML+=style;docElement.appendChild(div);ret=callback(div,rule);div.parentNode.removeChild(div);return !!ret;},testMediaQuery=function(mq){if(window.matchMedia){return matchMedia(mq).matches;}var bool;injectElementWithStyles("@media "+mq+" { #"+mod+" { position: absolute; } }",function(node){bool=(window.getComputedStyle?getComputedStyle(node,null):node.currentStyle)["position"]=="absolute";});return bool;},isEventSupported=(function(){var TAGNAMES={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};function isEventSupported(eventName,element){element=element||document.createElement(TAGNAMES[eventName]||"div");eventName="on"+eventName;var isSupported=eventName in element;if(!isSupported){if(!element.setAttribute){element=document.createElement("div");}if(element.setAttribute&&element.removeAttribute){element.setAttribute(eventName,"");isSupported=is(element[eventName],"function");if(!is(element[eventName],undefined)){element[eventName]=undefined;}element.removeAttribute(eventName);}}element=null;return isSupported;}return isEventSupported;})();var _hasOwnProperty=({}).hasOwnProperty,hasOwnProperty;if(!is(_hasOwnProperty,undefined)&&!is(_hasOwnProperty.call,undefined)){hasOwnProperty=function(object,property){return _hasOwnProperty.call(object,property);};}else{hasOwnProperty=function(object,property){return((property in object)&&is(object.constructor.prototype[property],undefined));};}function setCss(str){mStyle.cssText=str;}function setCssAll(str1,str2){return setCss(prefixes.join(str1+";")+(str2||""));}function is(obj,type){return typeof obj===type;}function contains(str,substr){return !!~(""+str).indexOf(substr);}function testProps(props,prefixed){for(var i in props){if(mStyle[props[i]]!==undefined){return prefixed=="pfx"?props[i]:true;}}return false;}function testPropsAll(prop,prefixed){var ucProp=prop.charAt(0).toUpperCase()+prop.substr(1),props=(prop+" "+domPrefixes.join(ucProp+" ")+ucProp).split(" ");return testProps(props,prefixed);}var testBundle=(function(styles,tests){var style=styles.join(""),len=tests.length;injectElementWithStyles(style,function(node,rule){var style=document.styleSheets[document.styleSheets.length-1],cssText=style.cssRules&&style.cssRules[0]?style.cssRules[0].cssText:style.cssText||"",children=node.childNodes,hash={};while(len--){hash[children[len].id]=children[len];}Modernizr.touch=("ontouchstart" in window)||hash.touch.offsetTop===9;Modernizr.csstransforms3d=hash.csstransforms3d.offsetLeft===9;Modernizr.generatedcontent=hash.generatedcontent.offsetHeight>=1;Modernizr.fontface=/src/i.test(cssText)&&cssText.indexOf(rule.split(" ")[0])===0;},len,tests);})(['@font-face {font-family:"font";src:url("https://")}',["@media (",prefixes.join("touch-enabled),("),mod,")","{#touch{top:9px;position:absolute}}"].join(""),["@media (",prefixes.join("transform-3d),("),mod,")","{#csstransforms3d{left:9px;position:absolute}}"].join(""),['#generatedcontent:after{content:"',smile,'";visibility:hidden}'].join("")],["fontface","touch","csstransforms3d","generatedcontent"]);tests.flexbox=function(){function setPrefixedValueCSS(element,property,value,extra){property+=":";element.style.cssText=(property+prefixes.join(value+";"+property)).slice(0,-property.length)+(extra||"");}function setPrefixedPropertyCSS(element,property,value,extra){element.style.cssText=prefixes.join(property+":"+value+";")+(extra||"");}var c=document.createElement("div"),elem=document.createElement("div");setPrefixedValueCSS(c,"display","box","width:42px;padding:0;");setPrefixedPropertyCSS(elem,"box-flex","1","width:10px;");c.appendChild(elem);docElement.appendChild(c);var ret=elem.offsetWidth===42;c.removeChild(elem);docElement.removeChild(c);return ret;};tests.canvas=function(){var elem=document.createElement("canvas");return !!(elem.getContext&&elem.getContext("2d"));};tests.canvastext=function(){return !!(Modernizr.canvas&&is(document.createElement("canvas").getContext("2d").fillText,"function"));};tests.webgl=function(){return !!window.WebGLRenderingContext;};tests.touch=function(){return Modernizr.touch;};tests.geolocation=function(){return !!navigator.geolocation;};tests.postmessage=function(){return !!window.postMessage;};tests.websqldatabase=function(){var result=!!window.openDatabase;return result;};tests.indexedDB=function(){for(var i=-1,len=domPrefixes.length;++i<len;){if(window[domPrefixes[i].toLowerCase()+"IndexedDB"]){return true;}}return !!window.indexedDB;};tests.hashchange=function(){return isEventSupported("hashchange",window)&&(document.documentMode===undefined||document.documentMode>7);};tests.history=function(){return !!(window.history&&history.pushState);};tests.draganddrop=function(){return isEventSupported("dragstart")&&isEventSupported("drop");};tests.websockets=function(){for(var i=-1,len=domPrefixes.length;++i<len;){if(window[domPrefixes[i]+"WebSocket"]){return true;}}return"WebSocket" in window;};tests.rgba=function(){setCss("background-color:rgba(150,255,150,.5)");return contains(mStyle.backgroundColor,"rgba");};tests.hsla=function(){setCss("background-color:hsla(120,40%,100%,.5)");return contains(mStyle.backgroundColor,"rgba")||contains(mStyle.backgroundColor,"hsla");};tests.multiplebgs=function(){setCss("background:url(https://),url(https://),red url(https://)");return/(url\s*\(.*?){3}/.test(mStyle.background);};tests.backgroundsize=function(){return testPropsAll("backgroundSize");};tests.borderimage=function(){return testPropsAll("borderImage");};tests.borderradius=function(){return testPropsAll("borderRadius");};tests.boxshadow=function(){return testPropsAll("boxShadow");};tests.textshadow=function(){return document.createElement("div").style.textShadow==="";};tests.opacity=function(){setCssAll("opacity:.55");return/^0.55$/.test(mStyle.opacity);};tests.cssanimations=function(){return testPropsAll("animationName");};tests.csscolumns=function(){return testPropsAll("columnCount");};tests.cssgradients=function(){var str1="background-image:",str2="gradient(linear,left top,right bottom,from(#9f9),to(white));",str3="linear-gradient(left top,#9f9, white);";setCss((str1+prefixes.join(str2+str1)+prefixes.join(str3+str1)).slice(0,-str1.length));return contains(mStyle.backgroundImage,"gradient");};tests.cssreflections=function(){return testPropsAll("boxReflect");};tests.csstransforms=function(){return !!testProps(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"]);};tests.csstransforms3d=function(){var ret=!!testProps(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);if(ret&&"webkitPerspective" in docElement.style){ret=Modernizr.csstransforms3d;}return ret;};tests.csstransitions=function(){return testPropsAll("transitionProperty");};tests.fontface=function(){return Modernizr.fontface;};tests.generatedcontent=function(){return Modernizr.generatedcontent;};tests.video=function(){var elem=document.createElement("video"),bool=false;try{if(bool=!!elem.canPlayType){bool=new Boolean(bool);bool.ogg=elem.canPlayType('video/ogg; codecs="theora"');var h264='video/mp4; codecs="avc1.42E01E';bool.h264=elem.canPlayType(h264+'"')||elem.canPlayType(h264+', mp4a.40.2"');bool.webm=elem.canPlayType('video/webm; codecs="vp8, vorbis"');}}catch(e){}return bool;};tests.audio=function(){var elem=document.createElement("audio"),bool=false;try{if(bool=!!elem.canPlayType){bool=new Boolean(bool);bool.ogg=elem.canPlayType('audio/ogg; codecs="vorbis"');bool.mp3=elem.canPlayType("audio/mpeg;");bool.wav=elem.canPlayType('audio/wav; codecs="1"');bool.m4a=elem.canPlayType("audio/x-m4a;")||elem.canPlayType("audio/aac;");}}catch(e){}return bool;};tests.localstorage=function(){try{return !!localStorage.getItem;}catch(e){return false;}};tests.sessionstorage=function(){try{return !!sessionStorage.getItem;}catch(e){return false;}};tests.webworkers=function(){return !!window.Worker;};tests.applicationcache=function(){return !!window.applicationCache;};tests.svg=function(){return !!document.createElementNS&&!!document.createElementNS(ns.svg,"svg").createSVGRect;};tests.inlinesvg=function(){var div=document.createElement("div");div.innerHTML="<svg/>";return(div.firstChild&&div.firstChild.namespaceURI)==ns.svg;};tests.smil=function(){return !!document.createElementNS&&/SVG/.test(toString.call(document.createElementNS(ns.svg,"animate")));};tests.svgclippaths=function(){return !!document.createElementNS&&/SVG/.test(toString.call(document.createElementNS(ns.svg,"clipPath")));};function webforms(){Modernizr.input=(function(props){for(var i=0,len=props.length;i<len;i++){attrs[props[i]]=!!(props[i] in inputElem);}return attrs;})("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));Modernizr.inputtypes=(function(props){for(var i=0,bool,inputElemType,defaultView,len=props.length;i<len;i++){inputElem.setAttribute("type",inputElemType=props[i]);bool=inputElem.type!=="text";if(bool){inputElem.value=smile;inputElem.style.cssText="position:absolute;visibility:hidden;";if(/^range$/.test(inputElemType)&&inputElem.style.WebkitAppearance!==undefined){docElement.appendChild(inputElem);defaultView=document.defaultView;bool=defaultView.getComputedStyle&&defaultView.getComputedStyle(inputElem,null).WebkitAppearance!=="textfield"&&(inputElem.offsetHeight!==0);docElement.removeChild(inputElem);}else{if(/^(search|tel)$/.test(inputElemType)){}else{if(/^(url|email)$/.test(inputElemType)){bool=inputElem.checkValidity&&inputElem.checkValidity()===false;}else{if(/^color$/.test(inputElemType)){docElement.appendChild(inputElem);docElement.offsetWidth;bool=inputElem.value!=smile;docElement.removeChild(inputElem);}else{bool=inputElem.value!=smile;}}}}}inputs[props[i]]=!!bool;}return inputs;})("search tel url email datetime date month week time datetime-local number range color".split(" "));}for(var feature in tests){if(hasOwnProperty(tests,feature)){featureName=feature.toLowerCase();Modernizr[featureName]=tests[feature]();classes.push((Modernizr[featureName]?"":"no-")+featureName);}}Modernizr.input||webforms();Modernizr.addTest=function(feature,test){if(typeof feature=="object"){for(var key in feature){if(hasOwnProperty(feature,key)){Modernizr.addTest(key,feature[key]);}}}else{feature=feature.toLowerCase();if(Modernizr[feature]!==undefined){return;}test=typeof test=="boolean"?test:!!test();docElement.className+=" "+(test?"":"no-")+feature;Modernizr[feature]=test;}return Modernizr;};setCss("");modElem=inputElem=null;if(window.attachEvent&&(function(){var elem=document.createElement("div");elem.innerHTML="<elem></elem>";return elem.childNodes.length!==1;})()){(function(win,doc){win.iepp=win.iepp||{};var iepp=win.iepp,elems=iepp.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",elemsArr=elems.split("|"),elemsArrLen=elemsArr.length,elemRegExp=new RegExp("(^|\\s)("+elems+")","gi"),tagRegExp=new RegExp("<(/*)("+elems+")","gi"),filterReg=/^\s*[\{\}]\s*$/,ruleRegExp=new RegExp("(^|[^\\n]*?\\s)("+elems+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),docFrag=doc.createDocumentFragment(),html=doc.documentElement,head=html.firstChild,bodyElem=doc.createElement("body"),styleElem=doc.createElement("style"),printMedias=/print|all/,body;function shim(doc){var a=-1;while(++a<elemsArrLen){doc.createElement(elemsArr[a]);}}iepp.getCSS=function(styleSheetList,mediaType){if(styleSheetList+""===undefined){return"";}var a=-1,len=styleSheetList.length,styleSheet,cssTextArr=[];while(++a<len){styleSheet=styleSheetList[a];if(styleSheet.disabled){continue;}mediaType=styleSheet.media||mediaType;if(printMedias.test(mediaType)){cssTextArr.push(iepp.getCSS(styleSheet.imports,mediaType),styleSheet.cssText);}mediaType="all";}return cssTextArr.join("");};iepp.parseCSS=function(cssText){var cssTextArr=[],rule;while((rule=ruleRegExp.exec(cssText))!=null){cssTextArr.push(((filterReg.exec(rule[1])?"\n":rule[1])+rule[2]+rule[3]).replace(elemRegExp,"$1.iepp_$2")+rule[4]);}return cssTextArr.join("\n");};iepp.writeHTML=function(){var a=-1;body=body||doc.body;while(++a<elemsArrLen){var nodeList=doc.getElementsByTagName(elemsArr[a]),nodeListLen=nodeList.length,b=-1;while(++b<nodeListLen){if(nodeList[b].className.indexOf("iepp_")<0){nodeList[b].className+=" iepp_"+elemsArr[a];}}}docFrag.appendChild(body);html.appendChild(bodyElem);bodyElem.className=body.className;bodyElem.id=body.id;bodyElem.innerHTML=body.innerHTML.replace(tagRegExp,"<$1font");};iepp._beforePrint=function(){styleElem.styleSheet.cssText=iepp.parseCSS(iepp.getCSS(doc.styleSheets,"all"));iepp.writeHTML();};iepp.restoreHTML=function(){bodyElem.innerHTML="";html.removeChild(bodyElem);html.appendChild(body);};iepp._afterPrint=function(){iepp.restoreHTML();styleElem.styleSheet.cssText="";};shim(doc);shim(docFrag);if(iepp.disablePP){return;}head.insertBefore(styleElem,head.firstChild);styleElem.media="print";styleElem.className="iepp-printshim";win.attachEvent("onbeforeprint",iepp._beforePrint);win.attachEvent("onafterprint",iepp._afterPrint);})(window,document);}Modernizr._version=version;Modernizr._prefixes=prefixes;Modernizr._domPrefixes=domPrefixes;Modernizr.mq=testMediaQuery;Modernizr.hasEvent=isEventSupported;Modernizr.testProp=function(prop){return testProps([prop]);};Modernizr.testAllProps=testPropsAll;Modernizr.testStyles=injectElementWithStyles;Modernizr.prefixed=function(prop){return testPropsAll(prop,"pfx");};docElement.className=docElement.className.replace(/\bno-js\b/,"")+(enableClasses?" js "+classes.join(" "):"");return Modernizr;})(this,this.document);
    
    
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
            
            //  DATATABLE (lazyloaded)
            $(".datatable").each(function(){
                var $elem = $(this);
                require(["jquery-ui","datatables"], function(){
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
            
            //  Don't let the nav scroll out of view - keepinview.js (lazyloaded)
            $("body > nav").each(function(){
                var $elem = $(this);
                require(["keepinview"], function(){
                    $elem.keepInView({zindex:4242});
                });
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
    });    
    