// global variables
var baseSlay = 0;
var diva;
var opposingDiva;
var divaArray = [];
var divaSelected = false;
var opposingDivaSelected = false;

// constructor 
function newDiva(name, hp, sp, counter, pic) {
    this.name = name;
    this.healthPoints = hp;
    this.slayPower = sp;
    this.counterAttackPower = counter;
    this.pic = pic;
}

// Increase the slay strength (this slay strength + original slay strength)
diva.prototype.increaseAttack = function () {
    this.attackPower += baseAttack;
};

function initDiva() {
    var gaga = new newDiva("Lady Gaga", 400, 10, 5, "assets/images/gaga2.jpg");
    var carly = new newDiva("Carly Rae Jepsen", 200, 20, 30, "assets/images/carly2.jpg");
    var ari = new newDiva("Ariana Grande", 150, 15, 2, "assets/images/ari3.jpg");
    var taylor = new newDiva("Taylor Swift", 180, 20, 12, "assets/images/taylor2.png");
    var tinashe = new newDiva("Tinashe", 180, 20, 12, "assets/images/tinashe3.png");
    var katy = new newDiva("Katy Perry", 180, 30, 12, "assets/images/katy2.png");
    divaArray.push(gaga, carly, ari, taylor, tinashe, katy);
}


// function initCharacters() {
let ari = new newDiva("Ari", 200, 25, "/assets/images/ari.png");
console.log(ari)
let gaga = new newDiva("Gaga", 400, 50, "/assets/images/gaga.png");
console.log(gaga);
let carly = new newDiva("Carly", 100, 50, "/assets/images/carly.png");
console.log(carly);
let tSwift = new newDiva("Taylor", 180, 35, "/assets/images/taylor.png");
console.log(tSwift);
let tinashe = new newDiva("Tinashe", 135, 50, "/assets/images/tinashe.png");
console.log(tinashe);
let katy = new newDiva("Katy", 20, 1, "/assets/images/katy.png");
console.log(katy);