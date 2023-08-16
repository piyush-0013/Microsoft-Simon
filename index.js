var buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if (started == false){
        nextSequence();
    }
    started = true;
});

function lighten(nextBox){
    $("#"+nextBox).css({
        "opacity":"0.3",
        "border": "10px solid #3d3b3b"
    });
    
    var audio = new Audio('sounds/'+nextBox+'.mp3');
    audio.play();

    setTimeout(function(){
        $("#"+nextBox).css({
            "opacity":"1",
            "border": "10px solid black"
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
    // nextSequence();
}


$("#green,#red,#yellow,#blue").click(function(){
    userPattern.push(this.id);
    // console.log(userPattern);

    $(this).css({
        "box-shadow": "0px 0px 12px 5px #635693",
        "height": "220px",
        "width": "220px",
        "margin":"10px",
        "opacity": "0.6"
    });    
    
    var audio = new Audio('sounds/'+this.id+'.mp3');
    audio.play();

    setTimeout(() => {
        $(this).css({
            "box-shadow": "0px 0px 0px 0px",
            "height": "200px",
            "width": "200px",
            "margin": "20px",
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
            $("h1").html("Game Over!");
            audio.play();
        }
    }

});