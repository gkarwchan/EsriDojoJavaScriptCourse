//use dojo/data/ItemFileReadStore = readStore

var myStore = new readStore({ griddata });
myGrid.setStore(myStore);

connect.connect(_map.map, "onExtentChange", function () {
    //query the grid
});


/******************* mobile ***************** */
//use dgrid/Grid = grid

var _grid = new grid(_map.featureLayer);
_grid.renderArray (array of JSON data);