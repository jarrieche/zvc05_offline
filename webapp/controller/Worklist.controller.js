sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",

	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox",
	"sap/ui/export/library",
	"sap/ui/export/Spreadsheet",
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, Fragment, MessageBox, exportLibrary, Spreadsheet,) {
	"use strict";

	return BaseController.extend("com.vc05.offline.zvc05offline.controller.Worklist", {

		formatter: formatter,


		_Sync: function () {
			var that = this;
			var modelo = "vc05Serv";
			var entidad = "VC05Set";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('VC05Set', JSON.stringify(ventasRealizadas));
			});

			var entidad00 = "OrgSales_SHSet";
			this._readOdataV2(modelo, entidad00).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('OrgSales_SHSet', JSON.stringify(ventasRealizadas));
			});

			var entidad01 = "CanalDis_SHSet";
			this._readOdataV2(modelo, entidad01).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('CanalDis_SHSet', JSON.stringify(ventasRealizadas));
			});

			var entidad02 = "CanalDis_SHSet";
			this._readOdataV2(modelo, entidad02).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('CanalDis_SHSet', JSON.stringify(ventasRealizadas));
			});

			var entidad03 = "Sector_SHSet";
			this._readOdataV2(modelo, entidad03).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('Sector_SHSet', JSON.stringify(ventasRealizadas));
			});

			var entidad04 = "HTvburSet";
			this._readOdataV2(modelo, entidad04).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('HTvburSet', JSON.stringify(ventasRealizadas));
			});

			var entidad05 = "HTvkgrSet";
			this._readOdataV2(modelo, entidad05).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('HTvkgrSet', JSON.stringify(ventasRealizadas));
			});

			var entidad06 = "DebiaSet";
			this._readOdataV2(modelo, entidad06).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('DebiaSet', JSON.stringify(ventasRealizadas));
			});

			var entidad07 = "HKtaarSet";
			this._readOdataV2(modelo, entidad07).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('HKtaarSet', JSON.stringify(ventasRealizadas));
			});

			var entidad08 = "VknkContactSet";
			this._readOdataV2(modelo, entidad08).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('VknkContactSet', JSON.stringify(ventasRealizadas));
			});

			var entidad09 = "PremjSet";
			this._readOdataV2(modelo, entidad09).then(function (dataRecibida) {
				var ventasRealizadas = dataRecibida.results;
				localStorage.setItem('PremjSet', JSON.stringify(ventasRealizadas));
			});
		},

		_handleSearch: function () {
			var that = this;
			var multiInputOrgVtas = this.getView().byId("help_01");
			var multiInputCanal = this.getView().byId("help_02");
			var multiInputSector = this.getView().byId("help_03");
			// var multiInputOrgVtas = this.getView().byId("help_04");
			// var multiInputOrgVtas = this.getView().byId("help_05");
			// var multiInputOrgVtas = this.getView().byId("help_06");
			// var multiInputOrgVtas = this.getView().byId("help_07");
			// var multiInputOrgVtas = this.getView().byId("help_08");
			// var multiInputOrgVtas = this.getView().byId("help_09");
			let sizeOrgVtas = multiInputOrgVtas.getTokens().length;
			//let sizeCanal = multiInputCanal.getTokens().length;
			//let sizeSector = multiInputSector.getTokens().length;
			//if (sizeOrgVtas == 0 || sizeCanal == 0 || sizeSector == 0) {
			if (sizeOrgVtas == 0) {
				MessageBox.error(
					"Favor de llenar Organizacion de Ventas", {
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
				//var Vtweg = multiInputCanal.getTokens()[0].getKey();
				//var Spart = multiInputSector.getTokens()[0].getKey();

				var filtro = new Array();
				filtro.push(new sap.ui.model.Filter("Vkorg", sap.ui.model.FilterOperator.EQ, vKorg));
				//filtro.push(new sap.ui.model.Filter("Vtweg", sap.ui.model.FilterOperator.EQ, Vtweg));
				//filtro.push(new sap.ui.model.Filter("Spart", sap.ui.model.FilterOperator.EQ, Spart));
				//this.read(entidad, filtro);
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
			if (navigator.onLine) {
				
				//that._Sync();

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
			} else {
				
				if (!localStorage.getItem(entidad)) {
					MessageBox.error("Usted esta fuera de linea y no sicronizo Datos!!!", {
						icon: MessageBox.Icon.ERROR,
						title: "Error"
					});
				} else {
					
					console.log("filtro pendnte",filtro)
					//HACER TRABAJAR LOS FTROS, FTRAR JSON OFFLE
					var datosGuardados = JSON.parse(localStorage.getItem(entidad));
					var ventasRealizadas = datosGuardados;
					var auxModeloVentas = new sap.ui.model.json.JSONModel();
					auxModeloVentas.setData({
						reporteVC05: ventasRealizadas
					});
					that.getView().setModel(auxModeloVentas, "ReporteDeVentasFiltrado");
					sap.ui.getCore().setModel(auxModeloVentas, "ReporteDeVentasFiltrado");
	
					var oTable = that.getView().byId("table");
					var oBinding = oTable.getBinding("rows");
					oBinding.filter(filtro);
					num = oBinding.getLength();
					oModel.getText("worklistTableTitleCount", [num]);
					that.byId("title").setText(oModel.getText("worklistTableTitleCount", [num]));
					that.getView().byId("table").setBusy(false);
				}
			}
			
		},

		fnAbr1rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "OrgSales_SHSet";
			var dialogName = "SelectDialog01";
			if (navigator.onLine) {
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
			} else {
				if (!localStorage.getItem(entidad)) {
					MessageBox.error("Usted esta fuera de linea y no sicronizo Datos!!!", {
						icon: MessageBox.Icon.ERROR,
						title: "Error"
					});
				} else {
					var datosGuardados = JSON.parse(localStorage.getItem(entidad));
					var modeloJson = new JSONModel(datosGuardados);
					that.getView().setModel(modeloJson, "newModelOrgVtas");
					var ModeloSeted = that.getView().getModel("newModelOrgVtas");

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
				}
			}
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
			if (navigator.onLine) {
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
			} else {
				if (!localStorage.getItem(entidad)) {
					MessageBox.error("Usted esta fuera de linea y no sicronizo Datos!!!", {
						icon: MessageBox.Icon.ERROR,
						title: "Error"
					});
				} else {
					var datosGuardados = JSON.parse(localStorage.getItem(entidad));
					var modeloJson = new JSONModel(datosGuardados);
					that.getView().setModel(modeloJson, "newModelCanalDis");
					var ModeloSeted = that.getView().getModel("newModelCanalDis");
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
				}
			}
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
			var entidad = "Sector_SHSet";
			var dialogName = "SelectDialog03";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelSector");
				var ModeloSeted = that.getView().getModel("newModelSector");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog003) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog003) {
						that._oDialog003 = oDialog003;
						that.getView().addDependent(that._oDialog003);
						that._oDialog003.setModel(ModeloSeted);
						that._oDialog003.open();
					}.bind(that));
				} else {
					that._oDialog003.setModel(ModeloSeted);
					that._oDialog003.open();
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
		fnAbr4rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "HTvburSet";
			var dialogName = "SelectDialog04";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelOficina");
				var ModeloSeted = that.getView().getModel("newModelOficina");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog004) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog004) {
						that._oDialog004 = oDialog004;
						that.getView().addDependent(that._oDialog004);
						that._oDialog004.setModel(ModeloSeted);
						that._oDialog004.open();
					}.bind(that));
				} else {
					that._oDialog004.setModel(ModeloSeted);
					that._oDialog004.open();
				}
			});
		},
		handleValueHelppress04: function (oEvent) {
			this.byId("help_04").removeAllTokens();
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
					this.byId("help_04").addToken(new sap.m.Token({
						key: this.elementos[cont],
						text: aTitle[cont]
					}));
				}
			} else {
				oInput.resetProperty("value");
			}
		},
		//newModelGrupoV
		fnAbr5rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "HTvkgrSet";
			var dialogName = "SelectDialog05";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelGrupoV");
				var ModeloSeted = that.getView().getModel("newModelGrupoV");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog005) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog005) {
						that._oDialog005 = oDialog005;
						that.getView().addDependent(that._oDialog005);
						that._oDialog005.setModel(ModeloSeted);
						that._oDialog005.open();
					}.bind(that));
				} else {
					that._oDialog005.setModel(ModeloSeted);
					that._oDialog005.open();
				}
			});
		},
		handleValueHelppress05: function (oEvent) {
			this.byId("help_05").removeAllTokens();
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
					this.byId("help_05").addToken(new sap.m.Token({
						key: this.elementos[cont],
						text: aTitle[cont]
					}));
				}
			} else {
				oInput.resetProperty("value");
			}
		},
		//newModelCliente
		fnAbr6rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "DebiaSet";
			var dialogName = "SelectDialog06";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelCliente");
				var ModeloSeted = that.getView().getModel("newModelCliente");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog006) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog006) {
						that._oDialog006 = oDialog006;
						that.getView().addDependent(that._oDialog006);
						that._oDialog006.setModel(ModeloSeted);
						that._oDialog006.open();
					}.bind(that));
				} else {
					that._oDialog006.setModel(ModeloSeted);
					that._oDialog006.open();
				}
			});
		},
		handleValueHelppress06: function (oEvent) {
			this.byId("help_06").removeAllTokens();
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
					this.byId("help_06").addToken(new sap.m.Token({
						key: this.elementos[cont],
						text: aTitle[cont]
					}));
				}
			} else {
				oInput.resetProperty("value");
			}
		},
		//newModelClaseCont
		fnAbr7rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "HKtaarSet";
			var dialogName = "SelectDialog07";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelClaseCont");
				var ModeloSeted = that.getView().getModel("newModelClaseCont");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog007) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog007) {
						that._oDialog007 = oDialog007;
						that.getView().addDependent(that._oDialog007);
						that._oDialog007.setModel(ModeloSeted);
						that._oDialog007.open();
					}.bind(that));
				} else {
					that._oDialog007.setModel(ModeloSeted);
					that._oDialog007.open();
				}
			});
		},
		handleValueHelppress07: function (oEvent) {
			this.byId("help_07").removeAllTokens();
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
					this.byId("help_07").addToken(new sap.m.Token({
						key: this.elementos[cont],
						text: aTitle[cont]
					}));
				}
			} else {
				oInput.resetProperty("value");
			}
		},
		//newModelInterloc
		fnAbr8rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "VknkContactSet";
			var dialogName = "SelectDialog08";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelInterloc");
				var ModeloSeted = that.getView().getModel("newModelInterloc");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog008) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog008) {
						that._oDialog008 = oDialog008;
						that.getView().addDependent(that._oDialog008);
						that._oDialog008.setModel(ModeloSeted);
						that._oDialog008.open();
					}.bind(that));
				} else {
					that._oDialog008.setModel(ModeloSeted);
					that._oDialog008.open();
				}
			});
		},
		handleValueHelppress08: function (oEvent) {
			this.byId("help_08").removeAllTokens();
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
					this.byId("help_08").addToken(new sap.m.Token({
						key: this.elementos[cont],
						text: aTitle[cont]
					}));
				}
			} else {
				oInput.resetProperty("value");
			}
		},
		//newModelEmpleado
		fnAbr9rMatchCode: function (oEvent) {
			var that = this;
			//getModel() llamando a mainService del manest general de la url del serv
			var modelo = "vc05Serv";
			var entidad = "PremjSet";
			var dialogName = "SelectDialog09";
			this._readOdataV2(modelo, entidad).then(function (dataRecibida) {
				console.log("dataRecibida", dataRecibida);
				console.log("results", dataRecibida.results);
				var modeloJson = new JSONModel(dataRecibida.results);
				that.getView().setModel(modeloJson, "newModelEmpleado");
				var ModeloSeted = that.getView().getModel("newModelEmpleado");
				console.log("ModeloSeted---> ", ModeloSeted);
				if (!that._oDialog009) {
					Fragment.load({
						name: "com.vc05.offline.zvc05offline.view." + dialogName,
						controller: that
					}).then(function (oDialog009) {
						that._oDialog009 = oDialog009;
						that.getView().addDependent(that._oDialog009);
						that._oDialog009.setModel(ModeloSeted);
						that._oDialog009.open();
					}.bind(that));
				} else {
					that._oDialog009.setModel(ModeloSeted);
					that._oDialog009.open();
				}
			});
		},
		handleValueHelppress09: function (oEvent) {
			this.byId("help_09").removeAllTokens();
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
					this.byId("help_09").addToken(new sap.m.Token({
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
			var that = this;
			var rowSeleccinado = oItem.getParent().getBindingContext("ReporteDeVentasFiltrado").getObject();
			console.log("rowSeleccinado-------------------->", rowSeleccinado)
			var auxModeloSelected = new sap.ui.model.json.JSONModel(rowSeleccinado);					
					that.getView().setModel(auxModeloSelected, "SelectedData");
					sap.ui.getCore().setModel(auxModeloSelected, "SelectedData");
			this.getRouter().navTo("object", {
				objectId: rowSeleccinado.Vbeln
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
		},


		download: function (oEvent) {
			var that = this;
			var url2 = window.location.origin + window.location.pathname;
			url2 = url2.substring(0, url2.length - 11);
			console.log("url2---> ",url2)
			var model = that.getView().getModel("ReporteDeVentasFiltrado");
			if (model == undefined || model == "undefined") {
				var errorMessage = "No hay consulta para exportar";
				sap.m.MessageBox.show(errorMessage, sap.m.MessageBox.Icon.WARNING, "Exportar Consulta");
			} else {
				that.downloadExcel(model.oData.reporteVC05);
			}
		},
		downloadExcel: function (oModel) {
			var aCols, aProducts, oSettings, oSheet;
			aCols = this.createColumns();
			aProducts = oModel;
			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aProducts,
				fileName: "Monitor de Ventas"
			};
			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then(function () {
					//MessageToast.show('Termino la descarga!');
				})
				.finally(function () {
					oSheet.destroy();
				});
		},
		createColumns: function () {
			return [{
				label: "Org. Ventas",
				property: "Vkorg",
			}, {
				label: "Texto",
				property: "Ktext",
			}, {
				label: "Segmento",
				property: "Segmento",
			}, {
				label: "DescSeg",
				property: "DescSeg",
			}, {
				label: "Marca",
				property: "Marca",
			}, {
				label: "Modelo",
				property: "Modelo",
			}, {
				label: "Año",
				property: "Anno",
			}, {
				label: "Color Exterior",
				property: "ColorExt",
			}, {
				label: "Color Interior",
				property: "ColorInt",
			}, {
				label: "Gama",
				property: "Gama",
			}];
		},
		onSearchFieldLiveChange: function (oEvent) {			
			var oTable = this.getView().byId("table");
			var sQuery = oEvent.getParameter("query");
			var oGlobalFilter = null;
			var oFilter = [];
			if (sQuery) {
				var oGlobalFilter = new Filter([
					new Filter("Vkorg", FilterOperator.Contains, sQuery),
					new Filter("Ktext", FilterOperator.Contains, sQuery),
					new Filter("Ktast_Txt_Vbka", FilterOperator.Contains, sQuery)
				], false);
				oFilter = new sap.ui.model.Filter([oGlobalFilter], true);
			}
			oFilter = oGlobalFilter;
			// filter binding
			var oBinding = oTable.getBinding("rows");
			oBinding.filter(oFilter);
		},
		handleSearch01: function (oEvent) {
            var sQuery = oEvent.getParameter("value");
            var oGlobalFilter = null;
            var oFilter = [];
            if (sQuery != null) {
                var oGlobalFilter = new Filter([
                    new Filter("Vtext", FilterOperator.Contains, sQuery),
                    new Filter("Vkorg", FilterOperator.Contains, sQuery)
                ], false);
                oFilter = new sap.ui.model.Filter([oGlobalFilter], true);
            } else {
                oGlobalFilter = null;
            }
            oFilter = oGlobalFilter;
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
		handleSearch02: function (oEvent) {
            var sQuery = oEvent.getParameter("value");
            var oGlobalFilter = null;
            var oFilter = [];
            if (sQuery != null) {
                var oGlobalFilter = new Filter([
                    new Filter("Vtext", FilterOperator.Contains, sQuery),
                    new Filter("Vtweg", FilterOperator.Contains, sQuery)
                ], false);
                oFilter = new sap.ui.model.Filter([oGlobalFilter], true);
            } else {
                oGlobalFilter = null;
            }
            oFilter = oGlobalFilter;
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },
		handleSearch03: function (oEvent) {
            var sQuery = oEvent.getParameter("value");
            var oGlobalFilter = null;
            var oFilter = [];
            if (sQuery != null) {
                var oGlobalFilter = new Filter([
                    new Filter("Vtext", FilterOperator.Contains, sQuery),
                    new Filter("Spart", FilterOperator.Contains, sQuery)
                ], false);
                oFilter = new sap.ui.model.Filter([oGlobalFilter], true);
            } else {
                oGlobalFilter = null;
            }
            oFilter = oGlobalFilter;
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },

	});
});