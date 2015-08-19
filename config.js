System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "lib/github/*",
    "npm:*": "lib/npm/*"
  },

  map: {
    "css": "github:systemjs/plugin-css@0.1.13",
    "ded/domready": "github:ded/domready@1.0.8",
    "domready": "npm:domready@1.0.8",
    "dutchcelt/Dater": "github:dutchcelt/Dater@2.0.7",
    "dutchcelt/FEP-KeepInView": "github:dutchcelt/FEP-KeepInView@1.0.3",
    "dutchcelt/FEP-Tabs": "github:dutchcelt/FEP-Tabs@0.4.3",
    "font-awesome": "npm:font-awesome@4.4.0",
    "jquery": "github:components/jquery@2.1.4",
    "moment": "github:moment/moment@2.10.6",
    "mustache": "npm:mustache@2.1.3",
    "traceur": "github:jmcriffey/bower-traceur@0.0.91",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.91",
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.4.2"
    },
    "npm:buffer@3.4.2": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "npm:mustache@2.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    }
  }
});
