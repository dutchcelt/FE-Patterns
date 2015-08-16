System.registerModule("./app/scripts/fep-fabs.js", [], function() {
  "use strict";
  var __moduleName = "./app/scripts/fep-fabs.js";
  (function(global, factory) {
    "use strict";
    global.FEP = global.FEP || {};
    global.FEP.supports = FEP.supports || {};
    global.FEP.supports.historyState = (history.replaceState) ? true : false;
    global.FEP.tabs = factory();
  })(this, function() {
    "use strict";
    return function(selector, settings) {
      var createCustomEvent = function(eventName, data) {
        var newEvent;
        try {
          newEvent = new CustomEvent(eventName, {
            'bubbles': true,
            'cancelable': true,
            'detail': data
          });
        } catch (e) {
          newEvent = document.createEvent('CustomEvent');
          newEvent.initCustomEvent(eventName, true, true, data);
        } finally {
          return newEvent;
        }
      };
      var selectorArray = function(selector, domElem) {
        return Array.prototype.slice.call((domElem || document).querySelectorAll(selector));
      };
      var classNameRegEx = function(classNameString) {
        var newRegEx = new RegExp("(?:^|\\s)" + classNameString + "(?!\\S)", "g");
        return newRegEx;
      };
      var stripClassName = function(classNameString) {
        selectorArray("." + classNameString, this.elem).forEach(function(domElem) {
          domElem.className = domElem.className.replace(classNameRegEx(classNameString), '');
        });
      };
      var addClassName = function(classNameString) {
        if (!classNameRegEx(classNameString).test(this.className)) {
          this.className += " " + classNameString;
        }
      };
      var scrollLocation;
      var hash = window.location.hash || "";
      var defaults = {
        historyState: this.supports.historyState,
        tabClass: "tabs-tab",
        paneClass: "tabs-pane",
        linkClass: "tabs-tab-link",
        targetClass: "target",
        activeClass: "active"
      };
      var options = Object.create(defaults);
      for (var key in settings) {
        options[key] = settings[key];
      }
      var loadhash = createCustomEvent("loadhash");
      var loadTAB = createCustomEvent("loadTAB");
      var tabs = {
        tabEvent: function(event) {
          if (event.target.className.indexOf(options.linkClass) < 0) {
            return false;
          }
          scrollLocation = document.documentElement.scrollTop;
          hash = event.target.getAttribute('href');
          if (event.type === "loadhash") {
            this.hashEvent(event);
          } else if (!options.historyState) {
            window.location.hash = hash.substr(1);
          } else {
            if (event.type === "click") {
              history.pushState({}, document.title, hash);
            }
            if (event.type === "loadTAB") {
              history.replaceState({}, document.title, hash);
            }
            this.hashEvent();
          }
        },
        hashEvent: function() {
          hash = window.location.hash;
          if (this.elem.querySelectorAll(hash).length === 0) {
            return false;
          }
          ;
          document.documentElement.scrollTop = scrollLocation;
          this.setTab();
        },
        setTab: function() {
          stripClassName.call(this, options.targetClass);
          stripClassName.call(this, options.activeClass);
          if (hash) {
            addClassName.call(this.elem.querySelector(hash), options.targetClass);
            addClassName.call(this.elem.querySelector("." + options.linkClass + "[href='" + hash + "']").parentNode, options.activeClass);
          }
        },
        handleEvent: function(event) {
          event.preventDefault();
          switch (event.type) {
            case 'click':
              this.tabEvent(event);
              break;
            case 'loadhash':
              this.tabEvent(event);
              break;
            case 'loadTAB':
              this.tabEvent(event);
              break;
            case 'hashchange':
              this.hashEvent();
              break;
          }
        },
        init: function() {
          this.elem.className += " loaded";
          this.elem.addEventListener('click', this, true);
          this.elem.addEventListener('loadhash', this, true);
          this.elem.addEventListener('loadTAB', this, true);
          window.addEventListener('hashchange', this, true);
          if (!window.location.hash) {
            this.elem.querySelector("." + options.linkClass).dispatchEvent(loadTAB);
          } else if (this.elem.querySelectorAll(window.location.hash).length > 0) {
            this.elem.querySelector("." + options.linkClass + "[href='" + window.location.hash + "']").dispatchEvent(loadhash);
          } else if (this.elem.querySelectorAll(window.location.hash).length === 0) {
            this.elem.querySelector("." + options.tabClass).className += " " + options.activeClass;
            this.elem.querySelector("." + options.paneClass).className += " " + options.targetClass;
          }
        }
      };
      return (function() {
        selectorArray(selector).forEach(function(domElem) {
          var newTabs = Object.create(tabs);
          newTabs.elem = domElem;
          newTabs.init();
        });
      })();
    };
  });
  return {};
});
