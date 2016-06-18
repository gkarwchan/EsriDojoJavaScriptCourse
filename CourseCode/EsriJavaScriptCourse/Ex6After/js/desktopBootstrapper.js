require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/ContentPane","dijit/layout/AccordionContainer",
    "dojox/grid/DataGrid","dojo/data/ItemFileReadStore",
    "dojo/_base/connect","dijit/registry", "dojo/topic","dojo/aspect",
    "my/map", "my/grid", "my/chart",
    "dojo/domReady!"],
    function(parser, borderContainer, contentPane, accordion, gridWidjet, readStore,
             connect, registry, topic, aspect,
             map, grid, chart)
    {
        parser.parse();

        var _map = addMapModule();
        var _grid = addGridModule();

        var _chart = new chart('rightDiv');

        wireMapExtentToGridSelection();
        wireResize();
        wireRefreshDataGrid();

        connect.connect(_map.featureLayer, 'onClick', displayGraph)

        function displayGraph(ev) {
            _chart.displayIncomeStats(ev);
        }


        function refreshGrid(){
            var myStore = new readStore({ data: _grid.myData });
            myGrid.setStore(myStore);
        }

        connect.connect(myGrid, 'onRowClick',function(evt){
            var rowIdx = evt.rowIndex;
            var value = myGrid.store.getValue(myGrid.getItem(rowIdx), "NAME");
            topic.publish('map/select', value);
        });

        function wireResize() {
            var divmap = registry.byId('mapDiv');
            connect.connect(divmap, 'resize', function () {
                topic.publish('dimension/changed');
            });
        };



        function addMapModule() {
            var _map = new map('mapDiv');
            _map.initialize();
            return _map;
        };
        function addGridModule() {
            var _grid = new grid(_map.featureLayer);
            _grid.queryExtent(_map.map.extent);
            return _grid;
        };
        function wireMapExtentToGridSelection() {
            connect.connect(_map.map, "onExtentChange", function () {
                _grid.queryExtent(_map.map.extent);
            });
        };
        function wireRefreshDataGrid() {
            var handle = aspect.after(_grid, "returnResults", refreshGrid);
        };

    });