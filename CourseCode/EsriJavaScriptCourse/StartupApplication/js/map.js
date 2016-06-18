dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.AccordionContainer");
dojo.require("esri.map");
dojo.require("esri.layers.FeatureLayer");
dojo.require("dijit.TooltipDialog");

var myMap;    // global variable representing the map

function init() {
	var initialExtent = new esri.geometry.Extent({"xmin":-13050590.679808607,"ymin":3848824.1306140213,"xmax":-13033430.566958608,"ymax":3863366.2752452563,"spatialReference":{"wkid":102100}});
	myMap = new esri.Map("mapDiv", {extent:initialExtent});
	myMap.infoWindow.resize(210,95);
	var baseLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
	myMap.addLayers([baseLayer]);

	dojo.connect(myMap, 'onLoad', function() {
		addNeighborhoods();
		initChart();
	});
	
	dojo.connect(myMap.infoWindow, 'onShow', hideTooltip);
	dojo.connect(dijit.byId('mapDiv'), 'resize', myMap, myMap.resize);
}

function addNeighborhoods() {
	var info_content = "<table><tr><td><b>2000 Population:</b></td><td style='text-align:right'>${TOTPOP_CY}</td></tr>"
                 + "<tr><td><b>Density (per Sq.Mi.)</b></td><td style='text-align:right'>${POPDENS_CY}</td></tr>"
                 + "<tr><td><b>Avg Family Size:</b></td><td style='text-align:right'>${AVGFMSZ_CY}</td></tr></table>";
	var infoTemplate1 = new esri.InfoTemplate("${NAME}", info_content);
	featureLayer1 = new esri.layers.FeatureLayer("http://servicesbeta2.esri.com/ArcGIS/rest/services/SanDiego/Neighborhoods/MapServer/0",{
		mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
		infoTemplate: infoTemplate1,
		id: "sd_neighborhoods",
		outFields: ["*"]
	});	
	var symbol0 = new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255, 0, 0, 0.9]));
	var myRenderer = new esri.renderer.ClassBreaksRenderer(symbol0, "POPDENS_CY");
	
	myRenderer.addBreak(0, 4000, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([204, 204, 255, 0.3])));
	myRenderer.addBreak(4000, 7500, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([167, 150, 250, 0.3])));
	myRenderer.addBreak(7500, 11000, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([126, 99, 242, 0.3])));
	myRenderer.addBreak(11000, 16000, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([81, 54, 235, 0.3])));
	myRenderer.addBreak(16000, Infinity, new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([0, 0, 224, 0.3])));
	
	featureLayer1.setRenderer(myRenderer);
	
	var selectionSymbol = new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([255,255,0,0.5]));
	featureLayer1.setSelectionSymbol(selectionSymbol);		

	dojo.connect(featureLayer1, "onLoad", function(){
		myMap.addLayer(featureLayer1);
		initGrid();
		updateGrid(featureLayer1);
	});
	
	dojo.connect(featureLayer1, "onMouseOver", showTooltip);
	dojo.connect(featureLayer1, "onMouseOut", hideTooltip);
	dojo.connect(featureLayer1, "onClick", displayIncomeStats);	

}

function showTooltip(evt){
	var newTip = new dijit.TooltipDialog({
	  id: "ttDialog",
	  content: evt.graphic.attributes.NAME,
	  style: "position: absolute; opacity: 0.8; width: auto; font: normal normal bold 6pt Tahoma;z-index:100"
	});
	newTip.startup();

	dijit.placeOnScreen(newTip.domNode, {x: evt.pageX, y: evt.pageY}, ["TL", "BL"], {x: 10, y: 10});
}


function hideTooltip() {
	var oldTip = dijit.byId("ttDialog");
	if (oldTip) {
	  oldTip.destroy();
	}
}

dojo.addOnLoad(init);

