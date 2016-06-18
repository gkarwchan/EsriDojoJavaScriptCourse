dojo.require("dojox.grid.DataGrid");
dojo.require("dojo.data.ItemFileReadStore");
dojo.require("esri.tasks.query");

function initGrid() {
	dojo.connect(myMap, 'onExtentChange', function() {
	  updateGrid(myMap.getLayer("sd_neighborhoods"));
	});
}

function updateGrid(fLayer) {
	var queryParams = new esri.tasks.Query();
	queryParams.geometry = esri.geometry.webMercatorToGeographic(myMap.extent);
	queryParams.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
	//console.log("myMap extent = " + dojo.toJson(myMap.extent.toJson()));
	//console.log("fLayer extent = " + dojo.toJson(fLayer.fullExtent.toJson()));	
	fLayer.queryFeatures(queryParams, queryTask_callback);
}


function queryTask_callback(fSet) {
	var myAttribs = {};
	var myItems = [];
	//begin for-loop to calculate myAtttribs objects and populate myItems
	for (var i=0, il=fSet.features.length; i<il; i++) {
		var own = fSet.features[i].attributes.OWNER_CY;
		var rent = fSet.features[i].attributes.RENTER_CY;
		var vac = fSet.features[i].attributes.VACANT_CY;
		var ownPct = ((Math.round((own / (own + rent + vac)) * 100)));
		myAttribs = {"NAME":fSet.features[i].attributes.NAME, "ownPct":ownPct};
		myItems.push(myAttribs);
	}
	//end for-loop
	var myData = { items: myItems };
	var myStore = new dojo.data.ItemFileReadStore({ data: myData });
	myGrid.setStore(myStore);

	dojo.connect(myGrid, 'onRowClick',function(evt){
		var rowIdx = evt.rowIndex;
		var value = myGrid.store.getValue(myGrid.getItem(rowIdx), "NAME");
		highlightNeighborhood(value);
	});	
	
}

function highlightNeighborhood(clickedName) {
	var nLayer = myMap.getLayer("sd_neighborhoods");
	var query2 = new esri.tasks.Query();
	query2.text = clickedName;
	nLayer.selectFeatures(query2, esri.layers.FeatureLayer.SELECTION_NEW);
}
