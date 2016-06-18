
define(["dojo/_base/declare", "dojo/data/ItemFileReadStore", "esri/tasks/query", "dojo/_base/lang", "esri/layers/FeatureLayer", "dojo/_base/array"],
    function (declare , readStore, esriTask, lang, featLayer, array) {
        return declare(null, {
            constructor: function (featureLayer) {
                this.featureLayer = featureLayer;
                this.returnResults = lang.hitch(this, this.returnResults);
                this.onError = lang.hitch(this, this.onError);
            },
            queryExtent: function (extent) {
                var queryParams = new esri.tasks.Query();
                queryParams.geometry = esri.geometry.webMercatorToGeographic(extent);
                queryParams.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
                this.featureLayer.queryFeatures(queryParams, this.returnResults, this.onError);
            },
            returnResults : function(fSet) {
                var myAttribs = {};
                var myItems = array.map(fSet.features, function (x) {
                    var own = x.attributes.OWNER_CY;
                    var rent = x.attributes.RENTER_CY;
                    var vac = x.attributes.VACANT_CY;
                    var ownPct = ((Math.round((own / (own + rent + vac)) * 100)));
                    return {"NAME" :x.attributes.NAME, "ownPct" : ownPct};
                });
                this.myData = { items: myItems };
            },
            onError: function(){

            }
        });


    });