$(document).ready(function (){
    let cowCount = 0;
    let humanCount = 0;
    let chickenCount = 0;
    let finalCountCows = 0;
    let finalCountHumans = 0;
    let finalCountChickens = 0;
    let diceArray = [];
    let rollCount = 2;

    makeGame();
    $("button#reroll").click(reroll);
    $("button#endturn").click(endTurn);
    $("button#start").click(startTurn);

    function makeGame(){
        $("button#start").hide();
        for(let i = 0; i < 13; i++){
            makeDice();
        }

    }
    function makeDice(){
        let board = $("div#diceArea");
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
    function randomDieFace(){
        let diceImg = ["chicken","cow","human","raygun","tank"];
        let randomNum = Math.floor((Math.random() * 5) + 1);
        return diceImg[randomNum - 1];
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
    function reroll(){
        rerollAll();
        rollCount--;
    }
    function rerollAll() {
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
        $("p#cowCount").text(`Cows: ${cowCount}`);
        $("p#humanCount").text(`Humans: ${humanCount}`);
        $("p#chickenCount").text(`Chickens: ${chickenCount}`);

        if(rollCount === 0){
            $("button#reroll").hide();
        }
    }
    function endTurn(){
        $("button#endturn").hide();
        $("button#reroll").hide();

        if(lost()){
            $("p#message").text(`GAME OVER`);
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
            finalCountHumans += humanCount;
            $("p#cowCount").text(`Cows: ${cowCount}`);
            $("p#humanCount").text(`Humans: ${humanCount}`);
            $("p#chickenCount").text(`Chickens: ${chickenCount}`);

            $("p#message").text(`Nice Job! You've collected ${humanCount} humans and ${cowCount} cows
        and ${chickenCount} chickens!`);
        }
        $("button#start").show();
        if(finalCountChickens > 0 && finalCountCows > 0 && finalCountHumans >0){
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
        $("button#reroll").show();
        $("button#endturn").show();
        $("button#start").hide();
        $("div#diceArea").empty();
        $("p#message").empty();
        makeGame();
    }
});