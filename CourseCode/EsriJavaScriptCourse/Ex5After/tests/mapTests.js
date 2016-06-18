define("tests.mapTests", ["my/map"], function (map) {
    doh.register("tests.mapTests.initialize", [
        {
            name: 'should store map div name',
            setUp: function(){
                this._map = new map('testDiv');
            },

            runTest: function(t){
                t.assertEqual("testDiv", this._map.mapDivName);
            },

            tearDown: function(){
                this._map = null;
            }
        }
    ]);

    doh.run();
});

