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
    this.topics = new Topics();
    this.topics.updateElement = function(node, value) {
        node.firstElementChild.textContent = value.color;
    };
    document.body.appendChild(this.topics);
}

function Controller() {
    this.model = new Model();
    this.view = new View();
  
    // bind the data
    this.model.getData(function(data){
        this.view.topics.bindData(data)
    }.bind(this));

    // listener
    document.addEventListener("keydown", function(e){
        if (e.keyCode == 37) this.view.topics.move(1);
        if (e.keyCode == 39) this.view.topics.move(-1);
    }.bind(this), true);
}

window.addEventListener("load", function(){
    new Controller()    
})
