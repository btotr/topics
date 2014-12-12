/*global Element*/
function FocusManager() {
    this.debugMode = false;
    this.focusedElement = null

    var self = this;

    document.addEventListener("keydown", function moveFocus(e) {
        // remove debug lines on backspace
        if (e.keyCode === 8){
            self.clearDebug();
            e.stopPropagation();
        }
        // NOTE use the html5 attribute autofocus to set the first focused element
        if (e.keyCode in self.directions) {
            if(self.focusInDirection(self.getFocusedElement(), e.keyCode)){
                e.preventDefault();
                e.stopPropagation();
                return
            }
            
            console.log(self.directions[parseInt(e.keyCode)], e.keyCode)
            window.dispatchEvent(new CustomEvent("nofocus", {"detail":{"direction":self.directions[parseInt(e.keyCode)]}}))
        }
    }, false);
}


FocusManager.prototype.setFocus = function setFocus(focusableNode) {
    console.log(focusableNode)
    var oldFocusableNode = this.getFocusedElement();
    if (oldFocusableNode) {
        oldFocusableNode.classList.remove("focus");
    }
    this.focusedElement = focusableNode;
    focusableNode.classList.add("focus");
    focusableNode.focus();
};

FocusManager.prototype.getFocusedElement = function getFocusedElement() {
    return this.focusedElement;
};

FocusManager.prototype.directions = {
    38 : "top",
    39 : "right",
    40 : "bottom",
    37 : "left"
};

FocusManager.prototype.getEuclideanDistance    = function getEuclideanDistance(point1, point2) {
    return parseInt(Math.sqrt(Math.pow(Math.abs(point1[0] - point2[0]),2) + Math.pow(Math.abs(point1[1] - point2[1]),2)), 10);
};

FocusManager.prototype.focusableElementsQuery = "::shadow .active button:not([disabled]):not([tabindex^='-'])";

FocusManager.prototype.focusInDirection = function focusInDirection(target, direction) {
    var nextFocus = this.getNearestElement(target, direction);
    if (nextFocus) {
        this.setFocus(nextFocus);
        return true;
    } else {
        return false;
    }
};

FocusManager.prototype.getNearestElement = function getNearestElement(target, direction) {
    // constrain focusable elements
    var focusableElements = [];

    focusableElements = document.querySelectorAll(this.focusableElementsQuery);

    // initialize start values
    var nearestElement = null;
    var nearestPosition = 999;
    var difference = 999;
    var tabIndex = 0;
    // width and heigth from the target
    var targetRect = target.getBoundingClientRect();
    var width = targetRect.width;
    var height = targetRect.height;
    // calculate targetPoint[x,y] 'o' which is the center from the direction
    // example (direction is top):
    // ------------o-------------
    // |                        |
    // |                        |
    // |                        |
    // --------------------------
    var tx = targetRect.left + (width/2);
    var ty = targetRect[this.directions[direction]];
    if (direction === 37 || direction === 39) {
        tx = targetRect[this.directions[direction]];
        ty = targetRect.top + (height/2);
    }
    var targetPoint = [tx, ty];
    // get the opposite direction (e.g. top becomes bottom)
    var opposite = this.directions[parseInt((direction+1)%4+37, 10)];
    for (var i=0,l=focusableElements.length; i < l; i++) {
        var element = focusableElements[i];
        var elementRect = element.getBoundingClientRect();
        
        if (elementRect.width === 0 || elementRect.height === 0) {
            continue;
        }
        
        var x = elementRect.left + elementRect.width/2;
        var y = elementRect[opposite];

        if (Math.abs(x-targetPoint[0]) >= Math.abs(elementRect.right - targetPoint[0])) {
            x = elementRect.right - elementRect.width/2;
        }
        
        if (direction === 37 || direction === 39) {
            x = elementRect[opposite];
            y = elementRect.top +  elementRect.height/2;
            if (Math.abs(y-targetPoint[1]) >= Math.abs(elementRect.bottom-targetPoint[1])) {
                y = elementRect.bottom - elementRect.height/2;
            }
        }
        
        if (targetPoint[1] + height/4 <= y && (direction === 38)) { continue; } // top
        if (targetPoint[1] - height/4 >= y && (direction === 40)) { continue; } // down
        if (targetPoint[0] - width/4 >= x && (direction === 39)) { continue; } // right
        if (targetPoint[0] + width/4 <= x && (direction === 37)) { continue; } // left

        difference = this.getEuclideanDistance(targetPoint, [x,y]);
        this.debug(targetPoint, x,y);
        if (difference <= nearestPosition) {
            nearestPosition = difference;
            nearestElement = element;
            var xLast = x;
            var yLast = y;
            this.debug(targetPoint, xLast,yLast, "green");
        }
    }
    
    //if (!nearestElement) { nearestElement = target; }
    return nearestElement;
};

    
FocusManager.prototype.debug = function debug(targetPoint, x,y, color) {
    if (this.debugMode){
        if (!color) { color = "red"; }
        if (targetPoint !== undefined && x !== undefined && y !== undefined) {
            var fragment = document.createElement("div");
            fragment.setAttribute("class", "debug")
            fragment.innerHTML = '<svg style="position:absolute;left:0;top:0;" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><line x1="'+targetPoint[0]+'" y1="'+targetPoint[1]+'" x2="'+x+'" y2="'+y+'" style="stroke:'+color+';stroke-width:3"/><circle cx="'+x+'" cy="'+y+'" r="10"  fill="'+color+'"/><circle cx="'+targetPoint[0]+'" cy="'+targetPoint[1]+'" r="10"  fill="blue"/></svg>';
            document.body.appendChild(fragment);
        }
    }
};

FocusManager.prototype.clearDebug = function debug() {
    if (this.debugMode){
        var debugFragments = document.querySelectorAll(".debug");
        for (var i=0,l=debugFragments.length;i<l;i++){
            debugFragments[i].parentNode.removeChild(debugFragments[i])
        }
    }
};
