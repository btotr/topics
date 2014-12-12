function Controller() {
    this.model = new Model();
    this.view = new View();
    this.navigationMode = "topics";
    this.timer = setTimeout(function(){},9999);
    this.focusManager = new FocusManager();
  
    // bind the data
    this.model.getData(function(data){
        this.view.slideshow.bindData(data)
    }.bind(this));
    
    // set the initial focus
    this.focusManager.setFocus(this.view.getFirstItemInTopic());

    // listener
    document.addEventListener("keydown", this.keydown.bind(this));
    this.view.slideshow.addEventListener("slideshowEnd", this.slideshowEnd.bind(this));
    window.addEventListener("nofocus", this.nofocus.bind(this))
}

Controller.prototype.nofocus = function(e){
    this.navigationMode = "slideshow";
    //var direction = e.detail.direction;
    //if (direction == "left") direction = "right"
    //if (direction == "right") direction = "left"
    //this.moveSlideshow(direction);
}

Controller.prototype.keydown = function(e){
    if (this.navigationMode == "topics") return
    if (e.keyCode == 37) this.moveSlideshow("right");
    if (e.keyCode == 39) this.moveSlideshow("left");
    e.preventDefault()
}

Controller.prototype.slideshowEnd = function(e){
    var self  = this;
    self.timer = setTimeout(function(){ 
        self.navigationMode = "topics"; 
        self.focusManager.setFocus(self.view.getFirstItemInTopic());
    },500)
}

Controller.prototype.moveSlideshow = function(direction){
    console.log("move", direction, this.navigationMode);
    
    window.clearTimeout(this.timer);
    // slideshow mode
    if (direction == "left")this.view.slideshow.move(1);
    if (direction == "right")this.view.slideshow.move(-1);
}

window.addEventListener("load", function(){
    new Controller()    
})
