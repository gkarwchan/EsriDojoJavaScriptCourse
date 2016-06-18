require(["dojo/parser", "dojox/mobile", "dojox/mobile/ToolBarButton", "dojox/mobile/deviceTheme",
    "my/map", "dojo/topic", "my/mobileController","dgrid/Grid", "my/grid","dojo/aspect","dojo/_base/connect",
    "dojo/domReady!"],
    function(parser, mobile, toolbar, device, map, topic, mobileDevice, dgrid, grid, aspect, connect)
    {
        parser.parse();
        var device = new mobileDevice("header", "map");
        topic.subscribe("map/loaded", callMaploadHandler);


        var _dgrid = new dgrid({
            columns: { NAME: "NAME", ownPct: "ownPct" }
        }, "mylist");

        var _map = new map('map');
        _map.initialize();

        var _grid = new grid(_map.featureLayer);
        var handle = aspect.after(_grid, "returnResults", refreshGrid);

        _grid.queryExtent(_map.map.extent);

        connect.connect(_map.map, "onExtentChange", function () {
            _grid.queryExtent(_map.map.extent);
        });

        _dgrid.on(".dgrid-row:click", function(event){
            var row = _dgrid.row(event);
            var value = row.data["NAME"];
            topic.publish('map/select', value);
        });

        function refreshGrid(){
            _dgrid.renderArray(_grid.myData.items);
        }

        function callMaploadHandler() {
            device.mapLoadHandler();
        }



    });