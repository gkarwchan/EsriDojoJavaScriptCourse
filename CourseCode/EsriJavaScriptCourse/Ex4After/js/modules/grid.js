
define(["dojo/_base/declare", "dojo/data/ItemFileReadStore", "esri/tasks/query", "dojo/_base/lang", "esri/layers/FeatureLayer"],
    function (declare , readStore, esriTask, lang, featLayer) {
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
                var def = this.featureLayer.queryFeatures(queryParams, this.returnResults, this.onError);
                return def;
            },
            returnResults : function(fSet) {

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
                this.myData = { items: myItems };

            },
            onError: function(){

            }
        });


    });