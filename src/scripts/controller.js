var Model = function() {};
Model.prototype.getData = function(callback){
    callback([
     { "color": "#A7A37E", "title": "topic 1","topics":[{"type":"image","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"banner","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"}]},
     { "color": "#EFECCA", "title": "topic 2","topics":[{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"banner","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"}]},
     { "color": "#046380", "title": "topic 3","topics":[{"type":"banner","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"banner","src":"","description":"test"}]},
     { "color": "#00BDBD", "title": "topic 4","topics":[{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"banner","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"poster","src":"","description":"test"}]},
     { "color": "#046B8A", "title": "topic 5","topics":[{"type":"image","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"}]},
     { "color": "#FFFCD8", "title": "topic 6","topics":[{"type":"image","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"banner","src":"","description":"test"},{"type":"banner","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"poster","src":"","description":"test"}]},
     { "color": "#A7A37E", "title": "topic 7","topics":[{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"poster","src":"","description":"test"}]},
     { "color": "#EFECCA", "title": "topic 8","topics":[{"type":"image","src":"","description":"test"},{"type":"banner","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"banner","src":"","description":"test"},{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"}]},
     { "color": "#046380", "title": "topic 9","topics":[{"type":"poster","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"image","src":"","description":"test"},{"type":"banner","src":"","description":"test"},{"type":"poster","src":"","description":"test"}]}
 ]);
};

function View() {
    function updateTopic(node, value){
        node.className = value.type;
        node.textContent = value.description;
    }
    
    function updateTopics(node, value) {
        node.style.backgroundColor = value.color; 
        node.firstElementChild.textContent = value.title;
        // bind topic
        var topic = node.querySelector("x-topic");
        topic.updateElement = updateTopic;
        topic.bindData(value.topics);
        node.appendChild(topic);
    };
    
    this.topics = new Topics();
    this.topics.updateElement = updateTopics;
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
        e.preventDefault()
    }.bind(this), true);
}

window.addEventListener("load", function(){
    new Controller()    
})
