function Controller() {
    this.model = new Model();
    this.view = new View();
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
}


Controller.prototype.keydown = function(e){
    if (e.keyCode == 37) this.moveSlideshow("right");
    if (e.keyCode == 39) this.moveSlideshow("left");
    e.preventDefault()
}

Controller.prototype.slideshowEnd = function(e){
    var self  = this;
    self.timer = setTimeout(function(){ 
        self.focusManager.setFocus(self.view.getFirstItemInTopic());
        self.focusManager.setActive(true);
    },  2000)
}

Controller.prototype.moveSlideshow = function(direction){
    this.focusManager.setActive(false);
    window.clearTimeout(this.timer);
    // slideshow mode
    if (direction == "left")this.view.slideshow.move(1);
    if (direction == "right")this.view.slideshow.move(-1);
}

window.addEventListener("load", function(){
    new Controller()    
})
