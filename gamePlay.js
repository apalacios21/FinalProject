$(document).ready(function (){
    let humanCount = 0;
    let chickenCount = 0;
    let cowCount = 0;
    let finalCountHuman = 0;
    let finalCountCows = 0;
    let finalCountChickens = 0;
    let rollCount = 2;
    let diceArray = [];
    buildGame();
    $("button#reRoll").click(reRoll);
    $("button#endTurn").click(endTurn);
    $("button#Start").click(startTurn);

    function buildGame(){
        $("button#Start").hide();
        for(let i = 0; i < 13; i++){
            createDice();
        }

    }
    function randomDieFace(){
        let diceImage = ["chicken","cow","human","raygun","tank"];
        let randomNum = Math.floor((Math.random() * 5) + 1);
        return diceImage[randomNum - 1];
    }
    function createDice(){
        let board = $("div#dice-area");
        let dice = $("<span>");
        let sqrWidth = Math.round(window.innerWidth/(5+2))
        let sqrHeight = Math.round(window.innerHeight/(5+2));
        let dimension = Math.min(sqrWidth,sqrHeight);
        dice.height(dimension);
        dice.width(dimension);
        board.append(dice);
        diceArray.push(dice);
        dice.addClass(randomDieFace());
        dice.addClass("unselected");
        dice.click(holdAndUnHold);
    }
    function holdAndUnHold(){
        let clicked = $(this);
        if (clicked.hasClass("unselected")){
            clicked.removeClass("unselected");
            clicked.addClass("selected");
        }else if(clicked.hasClass("selected")){
            clicked.removeClass("selected");
            clicked.addClass("unselected");
        }else{
            clicked.addClass("selected");
        }
    }
    function reRoll(){
        reRollAll();
        rollCount--;
    }
    function reRollAll() {
        $("span").each(function () {
            let i = $(this);
            if (i.hasClass("cow")) {
                if(i.hasClass("selected")){
                    cowCount++;
                    i.removeClass("selected");
                    i.addClass("held");
                }else if(i.hasClass("unselected")){
                    i.removeClass("cow");
                    i.addClass(randomDieFace);
                }
            } else if (i.hasClass("chicken")) {
                if(i.hasClass("selected")){
                    chickenCount++;
                    i.removeClass("selected");
                    i.addClass("held");
                }else if(i.hasClass("unselected")){
                    i.removeClass("chicken");
                    i.addClass(randomDieFace);
                }
            } else if (i.hasClass("human")) {
                if(i.hasClass("selected")){
                    humanCount++;
                    i.removeClass("selected");
                    i.addClass("held");
                }else if(i.hasClass("unselected")){
                    i.removeClass("human");
                    i.addClass(randomDieFace);
                }
            } else if (i.hasClass("tank")) {
            } else if (i.hasClass("raygun")) {
                if(i.hasClass("selected")){
                    i.removeClass("selected");
                    i.addClass("held");
                }else if(i.hasClass("unselected")){
                    i.removeClass("raygun");
                    i.addClass(randomDieFace);
                }
            }
        });
        $("p#humanCount").text(`Humans: ${humanCount}`);
        $("p#chickenCount").text(`Chickens: ${chickenCount}`);
        $("p#cowCount").text(`Cows: ${cowCount}`);
        if(rollCount === 0){
            $("button#reRoll").hide();
        }
    }
    function endTurn(){
        $("button#endTurn").hide();
        $("button#reRoll").hide();

        if(lost()){
            $("p#messageTurn").text(`GAME OVER`);
        }else{
            $("span").each(function () {
                let i = $(this);
                if (i.hasClass("cow")) {
                    if(i.hasClass("selected")){
                        cowCount++;
                        i.removeClass("selected");
                        i.addClass("held");
                    }
                } else if (i.hasClass("chicken")) {
                    if(i.hasClass("selected")){
                        chickenCount++;
                        i.removeClass("selected");
                        i.addClass("held");
                    }
                } else if (i.hasClass("human")) {
                    if(i.hasClass("selected")){
                        humanCount++;
                        i.addClass("held");
                    }
                } else if (i.hasClass("raygun")) {
                    if(i.hasClass("selected")){
                        i.addClass("held");
                    }
                }

            });
            finalCountChickens += chickenCount;
            finalCountCows += cowCount;
            finalCountHuman += humanCount;
            $("p#humanCount").text(`Human Counter: ${humanCount}`);
            $("p#chickenCount").text(`Chicken Counter: ${chickenCount}`);
            $("p#cowCount").text(`Cow Counter: ${cowCount}`);
            $("p#messageTurn").text(`Nice Job! You've collected ${humanCount} humans and ${cowCount} cows
        and ${chickenCount} chickens!`);
        }
        $("button#Start").show();
        if(finalCountChickens > 0 && finalCountCows > 0 && finalCountHuman >0){
            endGame();
        }
    }
    function endGame(){
        $("*button").hide();
    }
    function lost(){
        let tankCount = 0;
        let gunCount = 0;
        let condition;
        $("span").each(function () {
            let i = $(this);
            if(i.hasClass("tank")){
                tankCount++;
            }else if(i.hasClass("raygun")){
                gunCount++;
            }
        });
        if(gunCount >= tankCount){
            condition = false;
        }else if(tankCount > gunCount){
            condition = true;
        }
        return condition;
    }
    function startTurn(){
        if(lost()){
            cowCount = 0;
            humanCount = 0;
            chickenCount = 0;
        }
        rollCount = 2;
        $("button#reRoll").show();
        $("button#endTurn").show();
        $("button#Start").hide();
        $("div#dice-area").empty();
        $("p#messageTurn").empty();
        buildGame();
    }
});