var Model = function() {};
Model.prototype.getData = function(callback){
    var xhr = new XMLHttpRequest();
        var url =  "stub/data.json";
        xhr.open("GET", url, false);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xhr.send();
};