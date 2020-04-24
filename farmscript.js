// ==UserScript==
// @name         Farmassi
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Lazy Farming, PDTs pushen
// @author       NoelzeN
// @match        https://*.die-staemme.de/game.php?village=*&screen=am_farm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var all = document.getElementsByTagName("*");
    var belements = [];
    var lkavHome = 0;
    var splitSize = 2;
    for(var lol=0; lol<all.length; lol++) {
                    if(all[lol].name === "light")
                    {
                        if(all[lol].type === "text") {
                                        if(all[lol].value > 0) {
                                            //console.log("Splitsize: "+all[lol].value);
                                            splitSize = all[lol].value;
                                        }
                        }
                    }
    }
    //Get all B Button Elements from the Page
    for (var i=0, max=all.length; i < max; i++) {
        if(all[i].classList.contains("unit-item-light")) {
            lkavHome = all[i].innerText;
        }
        if(all[i].classList.contains("farm_icon_b")) {
            belements.push(all[i]);
        }
    }
    if(Number(belements.length-1) > Number(lkavHome)) {
        //console.log("Not enough LKav. " + Number(lkavHome) + " home but " + Number(belements.length-1) + " needed!");
        //return;
    }
    //Remove first Element as it is the non clickable one of the Vorlage xD
    belements.shift();
    //Randomize Array of Elements to avoid script detection by Innogames (hopefully)
    //belements = shuffle(belements);
    var aleng = belements.length;
    if(Number(lkavHome) < (aleng * splitSize)) {
        aleng = Number(lkavHome)/splitSize;
    }
    //Iterate over B Buttons
    for(i=0; i<aleng; i++) {
        //setTimeout(clickButton, 1000, belements[i]);

        // Click Button
        belements[i].click();

        //In 10% of the cases simulate a missclick by sleeping 1 second before the next click
        var missClick = Math.floor(Math.random()*100);
        if(missClick > 90) {
            sleepFor(Math.floor(Math.random()*300)+1200);
        }
        else{
            //Sleep for a random time between 200 and 400 ms
            sleepFor(Math.floor(Math.random()*150)+250);
        }

    }
})();

function clickButton(b) {
    console.log("Clicking " + b);
    b.click();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function sleepFor( sleepDuration ){
    //console.log("Sleeping for " + sleepDuration);
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
