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


}

