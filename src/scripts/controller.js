

/*
var Model = function() {};
Model.prototype.getData = function(callback){
    callback([
     { "color": "#A7A37E", "number": 1},
     { "color": "#EFECCA", "number": 2},
     { "color": "#046380", "number": 3},
     { "color": "#00BDBD", "number": 4},
     { "color": "#046B8A", "number": 5},
     { "color": "#FFFCD8", "number": 6},
     { "color": "#A7A37E", "number": 7},
     { "color": "#EFECCA", "number": 8},
     { "color": "#046380", "number": 9}
 ]) ;
};

function View() {
  var listUpdate = function(node, value) {
       node.style.backgroundColor = value.color;
       // node.textContent = value.number;
  };
  
  this.lists = [];
  var listElements = document.getElementsByTagName("ul");
  for (var i=0,l=listElements.length;i<l;i++) 
    this.lists.push(new List(listElements[i], listUpdate));
}

function Controller() {
  this.model = new Model();
  this.view = new View();
  // bind the data
  this.model.getData(function(data){
      this.view.lists.forEach(function(list){ list.bindData(data); });
  }.bind(this));
// listener
document.body.addEventListener("keydown", function(e){
    if (e.keyCode == 37) this.view.lists.forEach(function(list){ list.move(1); });
    if (e.keyCode == 39) this.view.lists.forEach(function(list){ list.move(-1); });
}.bind(this), true);
}

*/


//new Controller()