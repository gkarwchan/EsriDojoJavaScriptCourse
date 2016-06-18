require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/ContentPane","dijit/layout/AccordionContainer",
    "dojox/grid/DataGrid","dojo/data/ItemFileReadStore",
    "dojo/_base/connect","dijit/registry", "dojo/topic","dojo/aspect",
    "my/map", "my/grid",
    "dojo/domReady!"],
    function(parser, borderContainer, contentPane, accordion, gridWidjet, readStore,
             connect, registry, topic, aspect,
             map, grid)
    {
        parser.parse();

        var _map = new map('mapDiv');
        _map.initialize();

        var _grid = new grid(_map.featureLayer);
        //var defer = _grid.queryExtent(_map.map.extent);
        //defer.then(refreshGrid);



        connect.connect(_map.map, "onExtentChange", function () {
            var defer = _grid.queryExtent(_map.map.extent);
            //defer.then(refreshGrid);
        });

        wireResize();

        var handle = aspect.after(_grid, "returnResults", refreshGrid);

        function refreshGrid(){
            var myStore = new readStore({ data: _grid.myData });
            myGrid.setStore(myStore);
        }

        connect.connect(myGrid, 'onRowClick',function(evt){
            var rowIdx = evt.rowIndex;
            var value = myGrid.store.getValue(myGrid.getItem(rowIdx), "NAME");
//            highlightNeighborhood(value);
            topic.publish('map/select', value);
        });

        function wireResize() {
            var divmap = registry.byId('mapDiv');
            connect.connect(divmap, 'resize', function () {
                topic.publish('dimension/changed');
            });
        }
    });