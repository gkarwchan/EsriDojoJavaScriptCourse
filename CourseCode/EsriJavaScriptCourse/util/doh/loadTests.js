require(["doh/_browserRunner", "dojox/testing/DocTest", "dojo/window", "dojo/domReady!"],
    function (browser, doctest, wind){
      for(var moduleList= (window.testModule).split(","), i= 0; i<moduleList.length; i++){
         dojo.require("tests/" + moduleList[i].replace('.', '/'));

        }
            window.testModule = "";
            fixHeight();

            }
);




