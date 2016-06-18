/* *************** old code *************** */
dojo.connect(dijit.byId('mapDiv'), 'resize', myMap, myMap.resize);



/* ****************** new way ********************/

var divmap = registry.byId('mapDiv');
connect.connect(divmap, 'resize', function () {
    topic.publish('dimension/changed');
});


