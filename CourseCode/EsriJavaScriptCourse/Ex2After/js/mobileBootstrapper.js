require(["dojo/parser", "dojox/mobile", "dojox/mobile/ToolBarButton", "dojox/mobile/deviceTheme",
    "my/map", "dojo/domReady!"],
    function(parser, mobile, toolbar, device, map)
    {
        parser.parse();
        var _map = new map('map');
        _map.initialize();
    });