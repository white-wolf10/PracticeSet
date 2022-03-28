sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/m/library"
], function(Controller,mobileLibrary) {
	"use strict";

	return Controller.extend("cap.fin.ar.controller.Khali", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf cap.fin.ar.view.Khali
		 */
		//oTableFrag : "", 
		//onInit: function() {
			
			// var oModel = this.getOwnerComponent().getModel("models/mockData/employee.json");
			// this.getView().setModel(oModel, "employeeModel");
			
			// var oTable = this.getView().byId("idTablePD");
			// oTable.setModel(oModel);
			
			// var oModel = new sap.ui.model.json.JSONModel();
			// oModel.loadData("models/mockData/employee.json");
			// var oTable = this.getView().byId("idTablePD");
			
			// oTable.setModel(oModel,"employee");
		//},
		
		/**```````````````````````````````````````````````````````````````````````````
		 * Fragment tutorial and f4 help and select filling only
		 * 
		 **/
		//Hide and Show of column
		flag:true,
		onHide: function(oEvent){
			var oTable = this.getView().byId("idTablePD");
			var aCol = oTable.getColumns();
			var oCity = aCol[2];
			
			if(this.flag === true){
				oCity.setVisible(false);
				oEvent.getSource().setText("Show");
				this.flag = false;
			} else{
				oCity.setVisible(true);
				oEvent.getSource().setText("Hide");
				this.flag = true;
			}
		},
		
		
		//Popup logic for filter and f4 helps
		oPopup:null,
		oRegionPopup:null,
		myField:"",	//can be put null as well
		selectionCat:"", //used to identify category selection
		
		onFilter: function(){
			//Step1 :Create a new object of fragment
			if(!this.oPopup){
				this.oPopup = new sap.ui.xmlfragment("cap.fin.ar.fragments.Popup",this);
				//grants both read and write access to the fragment which view has
				this.getView().addDependent(this.oPopup);	
			}
			
			//Step2: fragment will return select Dialog object
			//use the same to bind with data
			this.oPopup.setTitle("Regions");
			this.oPopup.setMultiSelect(false);
			this.oPopup.bindAggregation("items",{
				path:'employee>/employee',
				template: new sap.m.DisplayListItem({
					label: "{employee>region}",
					value: "{employee>region}"
				})
			});
			//Step3:open the fragment
			this.oPopup.open();
		},
		
		onF4: function(oEvent){
			//to be utilized while filling the input field with selected value
			//onConfirm the current method where it will be used to fill the value 
			//in the input field can be used in some cases oEvent.getParameter
			this.myField = oEvent.getSource(); 
			
			//Step1 :Create a new object of fragment
			if(!this.oRegionPopup){
				//this is added to make the fragment know what view and controller where it is used 
				//and where it need to make those changes via binding
				this.oRegionPopup = new sap.ui.xmlfragment("cap.fin.ar.fragments.Popup",this); 
				//grants both read and write access to the fragment which view has
				this.getView().addDependent(this.oRegionPopup);	
			}
			
			//Step2: fragment will return select Dialog object
			//use the same to bind with data
			//example of how a different model is utilized
			this.oRegionPopup.setTitle("Employees");
			this.oRegionPopup.setMultiSelect(false);
			this.oRegionPopup.bindAggregation("items",{
				path:'/cities',
				template: new sap.m.DisplayListItem({
					label: "{cityname}",
					value: "{state}"
				})
			});
			//Step3:open the fragment
			this.oRegionPopup.open();
		},
		
		
		onConfirm: function(oEvent){
			//code to set the selected value from popup in the input field
			//Step 1: We need to know the item selected by user. Check in SDK selected Item parameter
			var oSelectedItem = oEvent.getParameter("selectedItem");
			var sCityName = oSelectedItem.getLabel();
			//Select the input field on which the f4 is pressed
			//precise object needed where f4 pressed
			this.myField.setValue(sCityName);
		},
		
		onConfirmFilter: function(){
		},
		
		//Logic for call and redirecting to website functionality
		handleUrlPress: function() {
            sap.m.URLHelper.redirect("https://www.google.com/search?gs_ssp=eJzj4tTP1TcwLEgzyVFgNGB0YPBiLk4sAAAzwwTZ&q=sap&rlz=1C1OPNX_enIN948IN948&oq=sap&aqs=chrome.1.69i57j46i20i199i263i275i433i465i512j69i60l6.9164j0j7&sourceid=chrome&ie=UTF-8");
		},
		_getVal: function(evt) {
			return evt.getSource().getValue();
		},
		handleTelPress: function (evt) {
			var URLHelper=mobileLibrary.URLHelper;
			URLHelper.triggerTel(this._getVal(evt));
		},
		handleUrlPressList: function (evt) {
			var URLHelper=mobileLibrary.URLHelper;
			URLHelper.redirect(this._getVal(evt), true);
		}
	
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf cap.fin.ar.view.Khali
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf cap.fin.ar.view.Khali
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf cap.fin.ar.view.Khali
		 */
		//	onExit: function() {
		//
		//	}
//```````````````````````````````````````````````````````````````````````````````````

	

	});

});