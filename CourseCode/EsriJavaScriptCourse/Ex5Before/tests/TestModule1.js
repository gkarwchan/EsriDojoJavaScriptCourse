

define("tests.TestModule1", ["my/map"], function (mp) {

    doh.register("tests.TestModule1", [
        {
            name: "asbasca",
            setUp: function () {
                this.map = new mp('testDiv');
                console.log(this.map);
            },
            runTest: function (t) {
                t.assertEqual('testDiv', this.map.mapDivName);
            }
        }
    ]);
    doh.run();
})

