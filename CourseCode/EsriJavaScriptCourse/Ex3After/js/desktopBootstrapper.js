require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/ContentPane","dijit/layout/AccordionContainer",
    "dojo/_base/connect","dijit/registry", "dojo/topic",
    "my/map",
    "dojo/domReady!"],
    function(parser, borderContainer, contentPane, accordion,
             connect, registry, topic,
             map)
    {
        parser.parse();

        var _map = new map('mapDiv');
        _map.initialize();

        var divmap = registry.byId('mapDiv');
        connect.connect(divmap, 'resize', function () {
                topic.publish('dimension/changed');
            });

    });