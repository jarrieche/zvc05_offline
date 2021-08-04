sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, Fragment, MessageBox) {
	"use strict";

	return BaseController.extend("com.vc05.offline.zvc05offline.controller.Worklist", {

		formatter: formatter,

		_Sync: function(){
			var that = this;
			var modelo = "vc05Serv";
			var entidad = "VC05Set";
            this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("Leo tabla syncr----> ", dataRecibida);
				var ventasRealizadas = dataRecibida.results;
				var auxModeloVentas = new sap.ui.model.json.JSONModel();
				auxModeloVentas.setData({
					reporteVC05: ventasRealizadas
				});
				that.getView().setModel(auxModeloVentas, "ReporteDeVentasFiltrado");
				sap.ui.getCore().setModel(auxModeloVentas, "ReporteDeVentasFiltrado");				
							
			});
		},

		_handleSearch: function () {
			var that = this;
			var multiInputOrgVtas = this.getView().byId("help_01");
			let sizeOrgVtas = multiInputOrgVtas.getTokens().length;
			if (sizeOrgVtas == 0) {
				MessageBox.error(
					"Favor de llenar todos los datos obligatorios", {
					icon: MessageBox.Icon.ERROR,
					title: "Monitor de Ventas",
					actions: ["Cerrar"],
					emphasizedAction: "Cerrar",
					onClose: function (oAction) {
					}
				});
			} else {
				//var vText = multiInputOrgVtas.getTokens()[0].getText();
				var vKorg = multiInputOrgVtas.getTokens()[0].getKey();
				
				var filtro = new Array();
				filtro.push(new sap.ui.model.Filter("Vkorg", sap.ui.model.FilterOperator.EQ, vKorg));
				//filtro.push(new sap.ui.model.Filter("Vkorg", sap.ui.model.FilterOperator.EQ, vKorg));
				//filtro.push(new sap.ui.model.Filter("Vkorg", sap.ui.model.FilterOperator.EQ, vKorg));
				this.read(filtro);
			}
		},
		read: function (filter) {
			var that = this;
			var modelo = "vc05Serv";
			var entidad = "VC05Set";
			var filtro = filter;
			var num = 0;
			var oModel = this.getView().getModel("i18n").getResourceBundle();
			this.getView().byId("table").setBusy(true);
			this._readOdataV2(modelo, entidad, filtro).then(function (dataRecibida) {
				console.log("dataRecibida----> ", dataRecibida);
				var ventasRealizadas = dataRecibida.results;
				var auxModeloVentas = new sap.ui.model.json.JSONModel();
				auxModeloVentas.setData({
					reporteVC05: ventasRealizadas
				});
				that.getView().setModel(auxModeloVentas, "ReporteDeVentasFiltrado");
				sap.ui.getCore().setModel(auxModeloVentas, "ReporteDeVentasFiltrado");				
				
				var oTable = that.getView().byId("table");
				var oBinding = oTable.getBinding("rows");
				num = oBinding.getLength();
				oModel.getText("worklistTableTitleCount", [num]);
				that.byId("title").setText(oModel.getText("worklistTableTitleCount", [num]));
				that.getView().byId("table").setBusy(false);
			});
		},

		fnAbr1rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "OrgSales_SHSet";
			var dialogName = "SelectDialog01";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelOrgVtas");
				var ModeloSeted = that.getView().getModel("newModelOrgVtas");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog001) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog001) {
						that._oDialog001 = oDialog001;
						that.getView().addDependent(that._oDialog001);
						that._oDialog001.setModel(ModeloSeted);
						that._oDialog001.open();
					}.bind(that));
				} else {
					that._oDialog001.setModel(ModeloSeted);
					that._oDialog001.open();
				}
			});
		},
		handleValueHelppress01: function (oEvent) {
			this.byId("help_01").removeAllTokens();
			this.elementos = [];
			var oSelectedItems = oEvent.getParameter("selectedItems");
			var aTitle = [];
			if (oSelectedItems !== "undefined") {
				for (var title = 0; title < oSelectedItems.length; title++) {
					var text = oSelectedItems[title].getTitle();
					aTitle.push(text);
					this.elementos.push(oSelectedItems[title].getInfo());
				}
				/* agregando los valores seleccionados a los tokens.*/
				for (var cont = 0; cont < aTitle.length; cont++) {
					this.byId("help_01").addToken(new sap.m.Token({
						key: this.elementos[cont],
						text: aTitle[cont]
					}));
				}
			} else {
				oInput.resetProperty("value");
			}
		},

		fnAbr2rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "CanalDis_SHSet";
			var dialogName = "SelectDialog02";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelCanalDis");
				var ModeloSeted = that.getView().getModel("newModelCanalDis");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog002) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog002) {
						that._oDialog002 = oDialog002;
						that.getView().addDependent(that._oDialog002);
						that._oDialog002.setModel(ModeloSeted);
						that._oDialog002.open();
					}.bind(that));
				} else {
					that._oDialog002.setModel(ModeloSeted);
					that._oDialog002.open();
				}
			});
		},
		handleValueHelppress02: function (oEvent) {
			this.byId("help_02").removeAllTokens();
			this.elementos = [];
			var oSelectedItems = oEvent.getParameter("selectedItems");
			var aTitle = [];
			if (oSelectedItems !== "undefined") {
				for (var title = 0; title < oSelectedItems.length; title++) {
					var text = oSelectedItems[title].getTitle();
					aTitle.push(text);
					this.elementos.push(oSelectedItems[title].getInfo());
				}
				/* agregando los valores seleccionados a los tokens.*/
				for (var cont = 0; cont < aTitle.length; cont++) {
					this.byId("help_02").addToken(new sap.m.Token({
						key: this.elementos[cont],
						text: aTitle[cont]
					}));
				}
			} else {
				oInput.resetProperty("value");
			}
		},

		fnAbr3rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "CanalDis_SHSet";
			var dialogName = "SelectDialog03";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelCanalDis");
				var ModeloSeted = that.getView().getModel("newModelCanalDis");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog002) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog002) {
						that._oDialog002 = oDialog002;
						that.getView().addDependent(that._oDialog002);
						that._oDialog002.setModel(ModeloSeted);
						that._oDialog002.open();
					}.bind(that));
				} else {
					that._oDialog002.setModel(ModeloSeted);
					that._oDialog002.open();
				}
			});
		},
		handleValueHelppress03: function (oEvent) {
			this.byId("help_03").removeAllTokens();
			this.elementos = [];
			var oSelectedItems = oEvent.getParameter("selectedItems");
			var aTitle = [];
			if (oSelectedItems !== "undefined") {
				for (var title = 0; title < oSelectedItems.length; title++) {
					var text = oSelectedItems[title].getTitle();
					aTitle.push(text);
					this.elementos.push(oSelectedItems[title].getInfo());
				}
				/* agregando los valores seleccionados a los tokens.*/
				for (var cont = 0; cont < aTitle.length; cont++) {
					this.byId("help_03").addToken(new sap.m.Token({
						key: this.elementos[cont],
						text: aTitle[cont]
					}));
				}
			} else {
				oInput.resetProperty("value");
			}
		},
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			var oViewModel,
				iOriginalBusyDelay,
				oTable = this.byId("table");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
			// keeps the search state
			this._aTableSearchState = [];

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0
			});
			this.setModel(oViewModel, "worklistView");

			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			oTable.attachEventOnce("updateFinished", function () {
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		onUpdateFinished: function (oEvent) {
			// update the worklist's object counter after the table update
			var sTitle,
				oTable = oEvent.getSource(),
				iTotalItems = oEvent.getParameter("total");
			// only update the counter if the length is final and
			// the table is not empty
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
			} else {
				sTitle = this.getResourceBundle().getText("worklistTableTitle");
			}
			this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress: function (oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},

		/**
		 * Event handler for navigating back.
		 * We navigate back in the browser history
		 * @public
		 */
		onNavBack: function () {
			// eslint-disable-next-line sap-no-history-manipulation
			history.go(-1);
		},


		onSearch: function (oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var aTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					aTableSearchState = [new Filter("Vkorg", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(aTableSearchState);
			}

		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function () {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function (oItem) {
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("Kunnr")
			});
		},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
		 * @private
		 */
		_applySearch: function (aTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(aTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		}

	});
});