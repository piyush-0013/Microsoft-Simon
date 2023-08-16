var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;
var currMode = "light";

starter();

function starter(){
    $(document).keypress(function(){
        if (started == false){
            nextSequence();
        }
        started = true;
    });
}

function restart(){
    gamePattern = [];
    userPattern = [];
    level = 0;
    started = false;
}

$("#mode").click(function(){
    if (currMode == "light"){
        document.querySelector("body").classList.add("darkmode");
        document.querySelector("h1").classList.add("h1dark");
        document.querySelector("#mode").innerHTML="Light Mode";
        currMode = "dark";
    }
    else{
        document.querySelector("body").classList.remove("darkmode");
        document.querySelector("h1").classList.remove("h1dark");
        document.querySelector("#mode").innerHTML="Dark Mode";
        currMode = "light";
    }

});

function lighten(nextBox){
    $("#"+nextBox).css({
        "opacity":"0.3",
    });
    
    var audio = new Audio('sounds/'+nextBox+'.mp3');
    audio.play();

    setTimeout(function(){
        $("#"+nextBox).css({
            "opacity":"1",
        });
    }, 150);
}


function nextSequence(){
    userPattern = [];
    $("h1").html("Level "+level);
    level++;
    var ind = Math.floor(Math.random()*4);
    var randomColor = buttonColors[ind];
    gamePattern.push(randomColor);
    lighten(randomColor);
}


$("#green,#red,#yellow,#blue").click(function(){
    userPattern.push(this.id);

    // this.classList.add("clicked");

    $(this).css({
        "box-shadow": "0px 0px 12px 5px #635693",
        "height": "220px",
        "width": "220px",
        "margin":"-5px",
        "opacity": "0.6"
    });    
    
    var audio = new Audio('sounds/'+this.id+'.mp3');
    audio.play();

    setTimeout(() => {
        // this.classList.remove("clicked");
        $(this).css({
            "box-shadow": "0px 0px 0px 0px",
            "height": "200px",
            "width": "200px",
            "margin": "5px",
            "opacity": "1"
        });        
        
    }, 100);

    if (gamePattern.length == userPattern.length){
        if (gamePattern.toString() === userPattern.toString()){
            setTimeout(function(){
                nextSequence();
            },320);
        }
        else{
            var audio = new Audio('sounds/wrong.mp3');
            $("h1").html("Game Over! Press a key to restart");
            audio.play();
            restart();
            starter();
        }
    }



});