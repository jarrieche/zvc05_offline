sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (ManagedObject, MessageBox, History) {

	return ManagedObject.extend("com.vc05.offline.zvc05offline.controller.SelectDialog01", {
		constructor: function (oView) {
			this._oView = oView;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "com.vc05.offline.zvc05offline.view.SelectDialog01", this);
			this._bInit = false;
		},
		exit: function () {
			delete this._oView;
		},
		getView: function () {
			return this._oView;
		},
		getControl: function () {
			return this._oControl;
		},
		getOwnerComponent: function () {
			return this._oView.getController().getOwnerComponent();
		},
		open: function () {
			var oView = this._oView;
			var oControl = this._oControl;
			if (!this._bInit) {
				this.onInit();
				this._bInit = true;
				// connect fragment to the root view of this component (models, lifecycle)
				oView.addDependent(oControl);
			}
			var args = Array.prototype.slice.call(arguments);
			if (oControl.open) {
				oControl.open.apply(oControl, args);
			} else if (oControl.openBy) {
				oControl.openBy.apply(oControl, args);
			}
		},
		close: function () {
			this._oControl.close();
		},
		setRouter: function (oRouter) {
			this.oRouter = oRouter;

		},
		getBindingParameters: function () {
			return {};
		},
		onInit: function () {
			this._oDialog = this.getControl();
		},
		onExit: function () {
			this._oDialog.destroy();
			// to destroy templates for bound aggregations when templateShareable is true on exit to prevent duplicateId issue
			var aControls = [{
				"controlId": "SelectDialog01",
				"groups": ["items"]
			}];
			for (var i = 0; i < aControls.length; i++) {
				var oControl = this.getView().byId(aControls[i].controlId);
				if (oControl) {
					for (var j = 0; j < aControls[i].groups.length; j++) {
						var sAggregationName = aControls[i].groups[j];
						var oBindingInfo = oControl.getBindingInfo(sAggregationName);
						if (oBindingInfo) {
							var oTemplate = oBindingInfo.template;
							oTemplate.destroy();
						}
					}
				}
			}
		},
		_onSelectDialogLiveChange: function (oEvent) {
			var sControlId = "SelectDialog01";
			var oControl = this.getView().byId(sControlId);
			// Get the search query, regardless of the triggered event ('query' for the search event, 'newValue' for the liveChange one, 'value' for the liveChange of SelectDialogs).
			var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || oEvent.getParameter("value");
			var sSourceId = oEvent.getSource().getId();
			return new Promise(function (fnResolve) {

				var aFilters = [];
				// 1) Search filters (with OR)
				if (sQuery && sQuery.length > 0) {
					aFilters.push(new sap.ui.model.Filter("Vkorg", sap.ui.model.FilterOperator.Contains, sQuery));
					aFilters.push(new sap.ui.model.Filter("Vtext", sap.ui.model.FilterOperator.Contains, sQuery));
				}
				var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, false)] : [];
				var oBindingOptions = this.updateBindingOptions(sControlId, {
					filters: aFinalFilters
				}, sSourceId);
				var oBindingInfo = oControl.getBindingInfo("items");
				if (oBindingInfo) {
					oControl.bindAggregation("items", {
						model: oBindingInfo.model,
						path: oBindingInfo.path,
						parameters: oBindingInfo.parameters,
						template: oBindingInfo.template,
						templateShareable: true,
						sorter: oBindingOptions.sorters,
						filters: oBindingOptions.filters
					});
				}
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		}

	});
}, /* bExport= */ true);