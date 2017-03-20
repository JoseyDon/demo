function operation(){
    var order = document.getElementById("pra_text").value;
    var block = document.getElementById("block");
    var blockhead = document.getElementById("block_head");
    var blockbody = document.getElementById("block_body");
    var headtop = blockhead.getBoundingClientRect().top;
    var bodytop = blockbody.getBoundingClientRect().top;
    var headleft = blockhead.getBoundingClientRect().left;
    var bodyleft = blockbody.getBoundingClientRect().left;

    if (order == "GO") {
        //当小方块朝上的时候
        if (headtop < bodytop) {
            var top = parseInt(block.style.top) - 40;
            if (top > 0) {
                block.style.top = top + "px";
            }
        }
            //当小方块朝下的时候
            else if (headtop > bodytop) {
                var top = parseInt(block.style.top) + 40;
                if (top <400) {
                    block.style.top = top + "px";
                }
            }
            //当小方块朝左的时候
            else if (headleft < bodyleft) {
                var left = parseInt(block.style.left) - 41;
                if (left >500) {
                    block.style.left = left + "px";
                }
            }
            //当小方块朝右的时候
            else{
                var left = parseInt(block.style.left) + 41;
                if (left < 950) {
                    block.style.left = left + "px";
                }
            }
    }

    if (order == "TUN RIG") {
        //当小方块朝上的时候
        if (headtop < bodytop) {
            block.style.transform = "rotate(90deg)";
        }
        //当小方块朝下的时候
        else if (headtop > bodytop) {
            block.style.transform = "rotate(270deg)";
        }
        //当小方块朝左的时候
        else if (headleft < bodyleft) {
            block.style.transform = "rotate(0deg)";
        }
        //当小方块朝右的时候
        else{
            block.style.transform = "rotate(180deg)";
        }
    }

    if (order == "TUN LEF") {
        //当小方块朝上的时候
        if (headtop < bodytop) {
            block.style.transform = "rotate(270deg)";
        }
        //当小方块朝下的时候
        else if (headtop > bodytop) {
            block.style.transform = "rotate(90deg)";
        }
        //当小方块朝左的时候
        else if (headleft < bodyleft) {
            block.style.transform = "rotate(180deg)";
        }
        //当小方块朝右的时候
        else{
            block.style.transform = "rotate(0deg)";
        }
    }

    if (order == "TUN BAC") {
        //当小方块朝上的时候
        if (headtop < bodytop) {
            block.style.transform = "rotate(180deg)";
        }
        //当小方块朝下的时候
        else if (headtop > bodytop) {
            block.style.transform = "rotate(0deg)";
        }
        //当小方块朝左的时候
        else if (headleft < bodyleft) {
            block.style.transform = "rotate(90deg)";
        }
        //当小方块朝右的时候
        else{
            block.style.transform = "rotate(270deg)";
        }
    }
}

function onclick(){
    document.getElementById("btn").onclick = operation;
}

onclick();