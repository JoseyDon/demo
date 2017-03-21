function angle(element, ang) {
    if (arguments.length === 1) {
        var text = element.style.transform;
        text = text.substring(7, text.length);
        text = parseInt(text);
        return text;
    }
    if (arguments.length === 2) {
        element.style.transform = "rotate(" + ang + "deg)";
        return;
    }
}

function $(id_selector) {
    return document.getElementById(id_selector.substring(1, id_selector.length));
}

function go(direction) {

    var block = $("#block");
    var left = parseInt(block.style.left),
        top = parseInt(block.style.top);

    if (direction === "lef")
        if (left >= 50)
            block.style.left = (left - 50) + "px";
    if (direction === "top")
        if (top >= 50)
            block.style.top = (top - 50) + "px";
    if (direction === "rig")
        if (left <= 400)
            block.style.left = (left + 50) + "px";
    if (direction === "bot")
        if (top <= 400)
            block.style.top = (top + 50) + "px";
}

function trace() {
    var direction = this.getAttribute("id").split("-")[1];
    go(direction);
}

function move() {
    
    var block = $("#block");
    var direction = this.getAttribute("id").split("-")[1];
    
    if (direction === "lef") {
        angle(block, 270);
        go(direction);
    }
    if (direction === "top") {
        angle(block, 0);
        go(direction);
    }
    if (direction === "rig") {
        angle(block, 90);
        go(direction);
    }
    if (direction === "bot") {
        angle(block, 180);
        go(direction);
    }
}

function onclick() {
    $("#mov-lef").onclick = move;
    $("#mov-top").onclick = move;
    $("#mov-rig").onclick = move;
    $("#mov-bot").onclick = move;
    
    $("#tra-lef").onclick = trace;
    $("#tra-top").onclick = trace;
    $("#tra-rig").onclick = trace;
    $("#tra-bot").onclick = trace;
}

window.onload = onclick;