// AMD ROUTING
require.config(
	{   baseUrl: "/scripts/minified",
		paths  : {
			"jquery"    : "jquery",
			"config"    : "config",
			"keepinview": "keepinview",
			"moment"    : "moment",
			"dater"     : "dater",
			"modules"   : "modules",
			"prism"     : "prism",
			"tabs"      : "tabs"
		},
		shim   : {
			"prism": {
				"exports": "Prism"
			}
		}
	}
);
