define(["dojo/_base/declare", "esri/map", "esri/layers/FeatureLayer", "dojo/_base/Color"],
    function (declare, esriLib, featureLib, Color) {
        return declare (null, {
            mapDivName : null,
            constructor: function (mapDiv) {
                this.mapDivName = mapDiv;

            },
            initialize: function() {
                var initialExtent = new esri.geometry.Extent({"xmin":-13050590.679808607,"ymin":3848824.1306140213,"xmax":-13033430.566958608,"ymax":3863366.2752452563,"spatialReference":{"wkid":102100}});
                this.map = new esri.Map(this.mapDivName, {extent: initialExtent, logo: false});
                var baseLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
                this.map.addLayers([baseLayer]);
                this.featureLayer = this.addFeatureLayer();
                this.map.resize();
                this.map.addLayer(this.featureLayer);
            },
            addFeatureLayer: function() {
                var info_content = "<table><tr><td><b>2000 Population:</b></td><td style='text-align:right'>${TOTPOP_CY}</td></tr>"
                    + "<tr><td><b>Density (per Sq.Mi.)</b></td><td style='text-align:right'>${POPDENS_CY}</td></tr>"
                    + "<tr><td><b>Avg Family Size:</b></td><td style='text-align:right'>${AVGFMSZ_CY}</td></tr></table>";
                var infoTemplate1 = new esri.InfoTemplate("${NAME}", info_content);
                var featureLayer1 = new esri.layers.FeatureLayer("http://servicesbeta2.esri.com/ArcGIS/rest/services/SanDiego/Neighborhoods/MapServer/0",{
                    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                    infoTemplate: infoTemplate1,
                    id: "sd_neighborhoods",
                    outFields: ["*"]
                });
                var symbol0 = new esri.symbol.SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.9]));
                var myRenderer = new esri.renderer.ClassBreaksRenderer(symbol0, "POPDENS_CY");

                myRenderer.addBreak(0, 4000, new esri.symbol.SimpleFillSymbol().setColor(new Color([204, 204, 255, 0.3])));
                myRenderer.addBreak(4000, 7500, new esri.symbol.SimpleFillSymbol().setColor(new Color([167, 150, 250, 0.3])));
                myRenderer.addBreak(7500, 11000, new esri.symbol.SimpleFillSymbol().setColor(new Color([126, 99, 242, 0.3])));
                myRenderer.addBreak(11000, 16000, new esri.symbol.SimpleFillSymbol().setColor(new Color([81, 54, 235, 0.3])));
                myRenderer.addBreak(16000, Infinity, new esri.symbol.SimpleFillSymbol().setColor(new Color([0, 0, 224, 0.3])));

                featureLayer1.setRenderer(myRenderer);

                var selectionSymbol = new esri.symbol.SimpleFillSymbol().setColor(new Color([255,255,0,0.5]));
                featureLayer1.setSelectionSymbol(selectionSymbol);
                return featureLayer1;
            }
        });

    });