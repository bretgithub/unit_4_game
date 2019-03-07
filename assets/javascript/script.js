/*
Few things I did not get to:
1. Resetting the game with a function, not a window reload
2. Adding an increasing slaw power with each slay to give more power to the player
3. Regenerating health after a diva has slayed another
4. Music randomizer
5. Cleaning up code - writing more functions, consolidating code 
6. Make responsive
*/

// starting the game on window load
window.onload = startGame();

// creating the diva constructors
class newDiva {
    constructor(name, hp, slay, pic) {
        this.name = name;
        this.hp = hp;
        this.slay = slay;
        this.pic = pic;
    }
}

// assigning the divas
let ari = new newDiva("Ari", 40, 15, "assets/images/ari3.png");
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

// global variables 
let divas = [ari, gaga, carly, tSwift, tinashe, katy];
console.log(divas);
let player = null; // is null and undefined is falsey, !player is truthy
let currentOpponent = null;
let playerSlay;
let oppSlay;

// tried to set up object with usic paths, to then at random play a song but thought it could be an array? not sure how to proceed
// let music = {
//     ariSong: "assets/javascript/ari.mp3",
//     carlySong: "assets/javascript/carly2.mp3",
//     katySong: "assets/javascript/katy.mp3",
//     gagaSong: "assets/javascript/ladygaga.mp3"
// }

// on window load the game initializes with startGame function
function startGame() {

    // plays a song, want it to be picj at random but didn't get there
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/javascript/carly2.mp3");

    // Music Button
    $(".theme-button").on("click", function () {
        audioElement.play();
    });
    $(".pause-button").on("click", function () {
        audioElement.pause();
    });

    // choosing your diva 
    $(".diva").click(function () {
        console.log($(this).attr("id"));
        // !player is this truthy therefore it lets you choose a character
        if (!player) {
            // .name is stored as player
            player = $(this).attr("id");
            // looping through all divas
            for (q = 0; q < divas.length; q++) {
                // if player name = divas.name then set player as that diva at the specified index
                if (player === divas[q].name) {
                    player = divas[q];
                    console.log(player);
                    // hide player from available divas arena and show player's diva in YOUR DIVA with inherited attributes
                    $("#" + player.name).hide(); // also can be expressed as a template literal: $(`#${player.name}`).hide();
                    $("#your-diva").append("<img class='card-img-top' src=" + player.pic + " />");
                    $("#your-diva").append("<h4 class='card-title' id='divaSelect'> " + player.name + " </h4>");
                    $("#your-diva").append("<p class='card-text' id='your-health'> Health: " + player.hp + " </p>");
                    $("#your-diva").append("<p class='card-text'> Slay Power: " + player.slay + " </p>");
                }
            }

            // now that player is stored you choose an opposing diva if currentOpponent is truthy
        } else if (!currentOpponent) {
            // .name is stored as currentOpponent
            currentOpponent = $(this).attr("id");
            //looping through all divas
            for (q = 0; q < divas.length; q++) {
                // if currentOpponent name = divas.name and currentOpponent name is not player.name set opponent as that diva at specified index
                if (currentOpponent === divas[q].name && currentOpponent != player.name) {
                    currentOpponent = divas[q];
                    console.log(currentOpponent);
                    // hide player from available divas arena and show player's diva in YOUR DIVA with inherited attributes
                    $("#" + currentOpponent.name).hide(); // also can be expressed as a template literal: $(`#${currentOpponent.name}`).hide();
                    $("#opposing-diva").append("<img class='card-img-top' src=" + currentOpponent.pic + " />");
                    $("#opposing-diva").append("<h4 class='card-title' id='divaSelect'> " + currentOpponent.name + " </h4>");
                    $("#opposing-diva").append("<p class='card-text' id='opposing-health'> Health: " + currentOpponent.hp + " </p>");
                    $("#opposing-diva").append("<p class='card-text'> Slay Power: " + currentOpponent.slay + " </p>");
                }
            }
        }
    });

    // replace the slay arena hp for divas with real time data
    function slayDialogue() {
        $("#slay-dialogue").html("<p> You've dealt '" + currentOpponent.name + "' '" + charSlay + "' points of SLAY damage </p>");
        $("#slay-dialogue").append("<p> You've been dealt '" + oppSlay + "' points of SLAY damage by '" + currentOpponent.name + "' </p>");
    }

    // when slay button is clicked
    $("#slaybutton").click(function () {
        // checks conidtions if divas are still alive
        if (player.hp > 0 && currentOpponent.hp > 0) {
            console.log("Player HP: " + player.hp);
            console.log("Opponent HP: " + currentOpponent.hp);
            // gets slay power at random from maximum 
            charSlay = Math.floor(Math.random() * player.slay) + 1;
            oppSlay = Math.floor(Math.random() * currentOpponent.slay) + 1;
            // deals slay attack to opponent
            currentOpponent.hp = currentOpponent.hp - charSlay;
            // displays slay dealt
            $("#opposing-health").html("Health: " + currentOpponent.hp);
            console.log("Player SLAY points: " + charSlay)
            // calls function to update diva's attributes
            slayDialogue();

            // if opponent still is alive after you slay, they slay back
            if (currentOpponent.hp > 0) {
                console.log("Opponent SLAY points: " + oppSlay)
                // opponent slay is reduced from your health
                player.hp = player.hp - oppSlay;
                // displys slay dealt 
                $("#your-health").html("Health: " + player.hp);
                // calls funtion to update diva's attributes
                slayDialogue()
                console.log(currentOpponent.hp);
                console.log(player.hp);
            }
        }

        // win / loss cases
        if (currentOpponent.hp < 1 && player.hp > 0) {
            console.log("you won");
            alert("You've SLAYED '" + currentOpponent.name + "' Choose another Diva to SLAY");
            // resets the attributes
            $("#slay-dialogue").html("");
            // removes your diva from the divas array
            for (p = 0; p < divas.length; p++) {
                if (divas[p].name === currentOpponent.name) { //indexOf -- alive.indexOd(currentOpponent.name)
                    divas.splice(p, 1);
                }
            }
            // reset opponent so player can pick another
            currentOpponent = null;
            // resets attributes
            $("#opposing-diva").html("");
            // if divas array has length of 1, game restarts because no more divas left to slay
            if (divas.length === 1) {
                alert("'" + player.name + "' has SLAYED all the Divas! Click ok to SLAY again");
                location.reload(true);
            }

            // if opponent wins
        } else if (currentOpponent.hp > 1 && player.hp < 1) {
            console.log("you lost");
            alert("You were SLAYED by '" + currentOpponent.name + "' Choose another Diva to SLAY");
            // reset player attributes
            $("#slay-dialogue").html("");
            for (w = 0; w < divas.length; w++) {
                if (divas[w].name === player.name) { //indexOf -- alive.indexOd(currentOpponent.name)
                    divas.splice(w, 1);
                }
            }
            player = null;
            $("#your-diva").html("");
            // if you lose and there are no other divas except the opponent the window reloads restarting the game
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
//     // restore their individual hp 
//     // wrap entire game in a funtion rthen call that function in here
// }


