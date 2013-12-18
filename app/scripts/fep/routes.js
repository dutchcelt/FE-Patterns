// AMD ROUTING
require.config(
	{   baseUrl: "/scripts/minified",
		paths  : {
			"jquery"        : "jquery",
			"config"        : "config",
			"FEP-KeepInView": "fep-keepinview",
			"moment"        : "moment",
			"dater"         : "dater",
			"prism"         : "prism",
			"FEP-Tabs"      : "fep-tabs"
		},
		shim   : {
			"prism": {
				"exports": "Prism"
			}
		}
	}
);
