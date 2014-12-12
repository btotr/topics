function View() {
    function updateTopic(node, value){
        node.className = value.type;
        node.querySelector("span").textContent = value.description;
        if (value.src !== "") {
            node.style.backgroundImage = "src("+value.src+")"
        }
    }
    
    function updateTopics(node, value) {
        node.innerHTML = "";
        node.style.backgroundColor = value.color;
        // title
        var title = document.createElement("h1");
        title.textContent = value.title;
        node.appendChild(title);
        
        // bind topic
        var topic = new Topic();
        topic.updateElement = updateTopic;
        topic.bindData(value.topics);
        node.appendChild(topic);
    };
    
    this.slideshow = new Slideshow();
    this.slideshow.updateElement = updateTopics;
    document.body.appendChild(this.slideshow);
}

View.prototype.getFirstItemInTopic = function(){
    return this.slideshow.shadowRoot.querySelector(".active button");
}