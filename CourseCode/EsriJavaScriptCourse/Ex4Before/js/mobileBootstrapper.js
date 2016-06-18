require(["dojo/parser", "dojox/mobile", "dojox/mobile/ToolBarButton", "dojox/mobile/deviceTheme",
    "my/map", "dojo/topic", "my/mobileController", "dojo/_base/connect",
    "dojo/domReady!"],
    function(parser, mobile, toolbar, theme, map, topic, mobileDevice, connect)
    {
        parser.parse();
        var device = new mobileDevice("header", "map");
        topic.subscribe("map/loaded", callMaploadHandler);
        var _map = new map('map');
        _map.initialize();
        function callMaploadHandler() {
            device.mapLoadHandler();
        }
    });