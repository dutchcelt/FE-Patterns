System.config({
  "baseURL": "/",
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "domready": "npm:domready@1.0.8",
    "dutchcelt/Dater": "github:dutchcelt/Dater@2.0.4",
    "dutchcelt/FEP-KeepInView": "github:dutchcelt/FEP-KeepInView@1.0.3",
    "dutchcelt/FEP-Tabs": "github:dutchcelt/FEP-Tabs@0.4.3",
    "font-awesome": "npm:font-awesome@4.4.0",
    "moment": "github:moment/moment@2.10.6",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.13"
    }
  }
});

