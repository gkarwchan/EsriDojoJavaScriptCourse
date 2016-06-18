define("tests.gridTests", ["my/grid", "esri/layers/FeatureLayer", "esri/map"], function (grid, featLayer, esriMap) {
    doh.register("tests.gridTests.queryExtent", [
        {
            name: 'should return areas in extent',
            setUp: function(){
                this.featureLayer = new esri.layers.FeatureLayer("http://servicesbeta2.esri.com/ArcGIS/rest/services/SanDiego/Neighborhoods/MapServer/0",{
                    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                    id: "sd_neighborhoods",
                    outFields: ["*"]
                });
                this.grid = new grid(this.featureLayer);
            },

            runTest: function(t){
                var extent = new esri.geometry.Extent({"xmin":-13047240.887327563,"ymin":3854180.696504776,"xmax":-13042090.942546714,"ymax":3857348.055864427,"spatialReference":{"wkid":102100}});
                this.grid.queryExtent(extent);
                var deffered = new doh.Deferred();
                setTimeout(deffered.getTestCallback(function () {
                    doh.assertEqual(5, this.grid.queryExtent(extent))
                }))
            },

            tearDown: function(){
                this._map = null;
            }
        }
    ]);

    doh.run();
});

