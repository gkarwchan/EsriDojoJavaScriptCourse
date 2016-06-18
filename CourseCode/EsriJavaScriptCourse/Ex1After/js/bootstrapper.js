require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/ContentPane","dijit/layout/AccordionContainer",
    "my/map", "dojo/domReady!"],
    function(parser, borderContainer, contentPane, accordion, map)
    {
        parser.parse();
        var _map = new map('mapDiv');
        _map.initialize();    });