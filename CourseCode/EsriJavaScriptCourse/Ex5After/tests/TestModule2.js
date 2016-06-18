// Declare out the name of the test module to make dojo's module loader happy.
dojo.provide("tests.TestModule2");

dojo.require("acme.Thinger");

doh.register("tests.TestModule2", [

    {
        name: "Basic Thinger Test 2",

        setUp: function(){
            this.thingerToTest = new acme.Thinger();
            this.thingerToTest.doStuffToInit();
        },

        runTest: function(t){
            t.assertEqual("blah", this.thingerToTest.blahProp);
            t.assertFalse(this.thingerToTest.falseProp);

            // ...
        },

        tearDown: function(){
            this.thingerToTest = null;
        }
    }

    // ...

]);
