/*  ###########################################################################
    Author:    C. Egor Kloos - DutchCelt Design
    ########################################################################### *///  LAZY LOADING ##############################################################
// AMD ROUTING 
require.config({baseUrl:"/scripts/minified",paths:{jquery:"jquery-2.0.1.min",config:"config-min",keepinview:"keepinview-min",datatable:"jquery.dataTables-min",modules:"modules-min"}});var FEP={};require(["jquery","config"],function(){$(document).ready(function(){$("html").attr("class","js");FEP.lazyload.init(FEP.config.getArray())})});FEP.lazyload=function(){var e={loadScript:function(){var e=this.elem,t=this.amd,r=this.opts,i=this.func,s=this.plugin,o=this.module,u=this.method;require(t,function(){if(i){var t=window[i];typeof t=="function"&&t(e)}s&&typeof e[s]=="function"&&e[s](r);o&&typeof $[o]=="function"&&e.each(function(e,t){var i=$[o]($(t),r);for(n=0,l=u.length;n<l;n++)i[u[n]]()})})},getScripts:function(t){var n=t.concat(),r=function(){var t=n.shift();t.elem.length>0&&e.loadScript.call(t);n.length>0&&setTimeout(r,0)};r()}};return{init:e.getScripts}}();if(!Object.create){var createEmpty,supportsProto=Object.prototype.__proto__===null;supportsProto||typeof document=="undefined"?createEmpty=function(){return{__proto__:null}}:createEmpty=function(){function r(){}var e=document.createElement("iframe"),t=document.body||document.documentElement;e.style.display="none";t.appendChild(e);e.src="javascript:";var n=e.contentWindow.Object.prototype;t.removeChild(e);e=null;delete n.constructor;delete n.hasOwnProperty;delete n.propertyIsEnumerable;delete n.isPrototypeOf;delete n.toLocaleString;delete n.toString;delete n.valueOf;n.__proto__=null;r.prototype=n;createEmpty=function(){return new r};return new r};Object.create=function(t,n){function i(){}var r;if(t===null)r=createEmpty();else{if(typeof t!="object"&&typeof t!="function")throw new TypeError("Object prototype may only be an Object or null");i.prototype=t;r=new i;r.__proto__=t}n!==void 0&&Object.defineProperties(r,n);return r}};