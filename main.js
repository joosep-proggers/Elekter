var fs = require("fs");
var text = fs.readFileSync("./data.json");

document.addEventListener('DOMContentLoaded', function(){
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init();
});
M.AutoInit();