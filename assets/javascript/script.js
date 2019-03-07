window.onload = startGame();

class newDiva {
    constructor(name, hp, slay, pic) {
        this.name = name;
        this.hp = hp;
        this.slay = slay;
        this.pic = pic;
    }
}
let ari = new newDiva("Ari", 30, 15, "assets/images/ari3.png");
console.log(ari)
let gaga = new newDiva("Gaga", 25, 12, "assets/images/gaga2.png");
console.log(gaga);
let carly = new newDiva("Carly", 20, 10, "assets/images/carly2.png");
console.log(carly);
let tSwift = new newDiva("Taylor", 18, 15, "assets/images/taylor2.png");
console.log(tSwift);
let tinashe = new newDiva("Tinashe", 22, 10, "assets/images/tinashe3.png");
console.log(tinashe);
let katy = new newDiva("Katy", 10, 8, "assets/images/katy2.png");
console.log(katy);

let divas = [ari, gaga, carly, tSwift, tinashe, katy];
console.log(divas);
let player = null; // is null and undefined is falsey,, !player is truthy
let currentOpponent = null;
let playerSlay;
let oppSlay;
let alive = [];

function startGame() {

    //on page load initialize game function

    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/javascript/carly2.mp3");

    // Music Button
    $(".theme-button").on("click", function () {
        audioElement.play();
    });
    $(".pause-button").on("click", function () {
        audioElement.pause();
    });

    // could start out as alive and not player put this.alive = true, this.player = false within class
    // .makeCard function {
    // sets all the card attributes in document
    // } - do this after , can add methods and anything of this type and has menthod 

    // function initCharacters() {

    $(".diva").click(function () {
        console.log($(this).attr("id"));
        if (!player) { // is this falsey
            player = $(this).attr("id"); //name stored as player
            for (q = 0; q < divas.length; q++) { //looping through all divas
                if (player === divas[q].name) { // if player name = divas name then set t
                    player = divas[q];
                    console.log(player);
                    $("#" + player.name).hide();//set player to diva // template literal - $(`#${player.name}`).hide();
                    $("#your-diva").append("<img class='card-img-top' src=" + player.pic + " />");
                    $("#your-diva").append("<h4 class='card-title' id='divaSelect'> " + player.name + " </h4>");
                    $("#your-diva").append("<p class='card-text' id='your-health'> Health: " + player.hp + " </p>");
                    $("#your-diva").append("<p class='card-text'> Slay Power: " + player.slay + " </p>");
                    // $("#" + player.name).show(function () {
                    //     ("#your-diva").append("<h2>testing</h2>");
                    // });
                }
            }

            // for (k = 0; k < divas.length; k++) {
            //     if (divas[k].name !== player.name) {
            //         alive.push(divas[k]);
            //     }
            // }

        } else if (!currentOpponent) {
            currentOpponent = $(this).attr("id");
            for (q = 0; q < divas.length; q++) { //looping through all divas
                if (currentOpponent === divas[q].name && currentOpponent != player.name) { // if player name = divas name then set t
                    currentOpponent = divas[q]; //set player to diva
                    console.log(currentOpponent);
                    $("#" + currentOpponent.name).hide();//set player to diva // template literal - $(`#${currentOpponent.name}`).hide();
                    $("#opposing-diva").append("<img class='card-img-top' src=" + currentOpponent.pic + " />");
                    $("#opposing-diva").append("<h4 class='card-title' id='divaSelect'> " + currentOpponent.name + " </h4>");
                    $("#opposing-diva").append("<p class='card-text' id='opposing-health'> Health: " + currentOpponent.hp + " </p>");
                    $("#opposing-diva").append("<p class='card-text'> Slay Power: " + currentOpponent.slay + " </p>");
                }
            }
        }
    });


    function slayDialogue() {
        $("#slay-dialogue").html("<p> You've dealt '" + currentOpponent.name + "' '" + charSlay + "' points of SLAY damage </p>");
        $("#slay-dialogue").append("<p> You've been dealt '" + oppSlay + "' points of SLAY damage by '" + currentOpponent.name + "' </p>");
    }

    $("#slaybutton").click(function () {
        if (player.hp > 0 && currentOpponent.hp > 0) {
            console.log("Player HP: " + player.hp);
            console.log("Opponent HP: " + currentOpponent.hp);
            charSlay = Math.floor(Math.random() * player.slay) + 1;
            oppSlay = Math.floor(Math.random() * currentOpponent.slay) + 1;
            currentOpponent.hp = currentOpponent.hp - charSlay;
            $("#opposing-health").html("Health: " + currentOpponent.hp);
            console.log("Player SLAY points: " + charSlay)
            slayDialogue();

            // $("#slay-dialogue").html("");
            if (currentOpponent.hp > 0) {
                console.log("Opponent SLAY points: " + oppSlay)
                player.hp = player.hp - oppSlay;
                $("#your-health").html("Health: " + player.hp);
                slayDialogue()
                console.log(currentOpponent.hp);
                console.log(player.hp);
            }
        }

        if (currentOpponent.hp < 1 && player.hp > 0) {
            console.log("you won");
            alert("You've SLAYED '" + currentOpponent.name + "' Choose another Diva to SLAY");
            $("#slay-dialogue").html("");
            for (p = 0; p < divas.length; p++) {
                if (divas[p].name === currentOpponent.name) { //indexOf -- alive.indexOd(currentOpponent.name)
                    divas.splice(p, 1);
                }
            }
            currentOpponent = null; //reset opponent
            $("#opposing-diva").html("");
            if (divas.length === 1) {
                alert("'" + player.name + "' has SLAYED all the Divas! Click ok to SLAY again");
                location.reload(true);
            }
            // return currentOpponent;
            // } else if (char.hp[player] < char.hp[currentOpponent] && char.hp[player] < 1) {
        } else if (currentOpponent.hp > 1 && player.hp < 1) {
            console.log("you lost");
            alert("You were SLAYED by '" + currentOpponent.name + "' Choose another Diva to SLAY");
            $("#slay-dialogue").html("");
            for (w = 0; w < divas.length; w++) {
                if (divas[w].name === player.name) { //indexOf -- alive.indexOd(currentOpponent.name)
                    divas.splice(w, 1);
                }
            }
            player = null; //reset opponent
            $("#your-diva").html("");
            if (divas.length === 1) {
                alert("'" + currentOpponent.name + "' has SLAYED all the Divas! Click ok to SLAY again");
                location.reload(true);
            }
        }
    });
};

// function resetGame() {
//     let divas = [ari, gaga, carly, tSwift, tinashe, katy];
//     console.log(divas);
//     player = null;
//     currentOpponent = null;
//     playerSlay;
//     oppSlay;
//     alive = [];
//     characterSelected = false;
//     opponentSeledcted = false;
//     $("#opposing-diva").html("");
//     $("#your-diva").html("");
//     $(".diva").show();
//     startGame();
//     // restore their individual hp their
//     // wrap entire game in a funtion rthen call that function inhere
// }


// update when you have beat all the divas

// reset page on javsascript 
// or reset game function 

//replace aletrs with modals
