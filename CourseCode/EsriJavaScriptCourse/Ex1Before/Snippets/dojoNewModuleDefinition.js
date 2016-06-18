
/* ***************
                Dojo new require definition
                ********************************* */
 require(["dojo/_base/declare", "esri/map", "esri/layers/FeatureLayer", "dojo/_base/Color", "dojo/_base/connect", "esri/dijit/Attribution"],
 function (declare, esriLib, featureLib, Color, connect, attr) {
 });



/* ***************
                Dojo new module definition
                ********************************* */
 define(["dojo/_base/declare", "esri/map", "esri/layers/FeatureLayer", "dojo/_base/Color", "dojo/_base/connect", "esri/dijit/Attribution"],
 function (declare, esriLib, featureLib, Color, connect, attr) {
 });

/* ***************
                Dojo module that return an object
 ********************************* */

define(["dojo/_base/declare", "esri/map", "esri/layers/FeatureLayer", "dojo/_base/Color", "dojo/_base/connect", "esri/dijit/Attribution"],
    function (declare, esriLib, featureLib, Color, connect, attr) {
        return declare (null, {
            constructor: function () {....},
            ...
        })
    });

/* ***************
                 Dojo configuration to load modules from our custom directory
 ********************************* */
var dojoConfig = {
            parseOnLoad: false,
            async: true,
            packages : [{
                "name" : "my",
                "location" : location.pathname.replace(/\/[^/]+$/, "") + "/js/modules"
            }]
        };