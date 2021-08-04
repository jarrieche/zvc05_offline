/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"com/vc05/offline/zvc05offline/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});