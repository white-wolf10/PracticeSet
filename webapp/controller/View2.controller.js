sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("cap.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cap.fin.ar.view.View2
		 */
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.herculis, this);
		},
		flag:true,
		onHide: function(oEvent){
			var oTable = this.getView().byId("idTable");
			var aCol = oTable.getColumns();
			var oCity = aCol[2];
			if(this.flag === true){
				oCity.setVisible(false);
				oEvent.getSource().setText("Show");
				this.flag = false;
			}
			else{
				oCity.setVisible(true);
				oEvent.getSource().setText("Hide");
				this.flag = true;
			}
		},
		
		oSuppPopup: null,
		oCityPopup: null,
		myField:"",
		onConfirm: function(oEvent){
			//code to set the value to the input field 
			//s1: find out  which item selected by user
			//confirm event has a selectedItem parameter in sdk
			var oSelectedItem = oEvent.getParameter("selectedItem");
			var sCityName = oSelectedItem.getLabel();
			this.myField.setValue(sCityName); 
		},
		
		onF4: function(oEvent){
			this.myField = oEvent.getSource();
			//create a brand new object of our fragment
			if(!this.oCityPopup){
				this.oCityPopup = new sap.ui.xmlfragment("cap.fin.ar.fragments.Popup",this);
				 //Permitting fragment to use model
				this.getView().addDependent(this.oCityPopup);
				this.oCityPopup.setMultiSelect(false);	//Polymorphism concept
			}
			//fragment return Select Dialog object
			//We will use the same to bind it with data
			this.oCityPopup.setTitle("Suppliers");
			this.oCityPopup.bindAggregation("items",{
				path: "/cities",
				template: new sap.m.DisplayListItem({
					label: "{cityname}",
					value: "{state}"
				})
			});
			//open the fragment
			this.oCityPopup.open();
		},
		onFilter: function(oEvent){
			//create a brand new object of our fragment
			if(!this.oSuppPopup){
				this.oSuppPopup = new sap.ui.xmlfragment("cap.fin.ar.fragments.Popup");
				 //Permitting fragment to use model
				this.getView().addDependent(this.oSuppPopup);
			}
			//fragment return Select Dialog object
			//We will use the same to bind it with data
			this.oSuppPopup.setTitle("Suppliers");
			this.oSuppPopup.bindAggregation("items",{
				path: "/suppliers",
				template: new sap.m.DisplayListItem({
					label: "{name}",
					value: "{city}"
				})
			});
			//open the fragment
			this.oSuppPopup.open();
		},
		herculis: function(oEvent){
			//debugger;	
			var id = oEvent.getParameter("arguments").fruitId;
			var sPath = "/fruits/" + id; /*address of the fruit which was selected */
			this.getView().bindElement(sPath);
			
		},
		/* @memberOf sap.ui.core.Event */
		onBack: function(oEvent){
			
			this.oRouter.navTo("bahubali");//currently working
			//alert("back to be implemented yet");
			//step 1: get the parent object of current view - app contaioner
			/** @type sap.m.App */
			var oApp = this.getView().getParent();
			//step 2: navigate back to view 1
			oApp.to("idView1");
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf cap.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});