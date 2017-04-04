var colorBtns = document.getElementsByClassName('colorBtn');

var btnObjct = {
    color: null,
    pressCounter: null,
    pressCounterUser: null
};
var btnArray = [];
var stepLevel = 0;
var levelCounter = 0;
var startPressBtn = true;
var timerIdInterval = null;
userStepLevel = 0;
start = function () {
    if (startPressBtn) {
        startPressBtn = false;
        createGameObject();
        computer();
        document.getElementById('turn').innerHTML='simon turn';
    } else return 0;

};
/**step level incremnt evrey turn every 2sec fire settimeout-fire activ=press ;
 * if count down level*/
computer = function () {
    levelCounter = stepLevel;

    var intervalIPressBtn = setInterval(function () {
        if ((btnArray[levelCounter].pressCounter--) == 0) {
            levelCounter--;
            if (levelCounter < 0) {
                clearInterval(intervalIPressBtn);
                user();
                return;
            }
        }
        this.colorBtns[btnArray[levelCounter].color].classList.add('active');
        setTimeout(function () {
            colorBtns[btnArray[levelCounter].color].classList.remove('active');
        }, 1000);
    }, 2000);
};
/**create 2 array of random btn and click */
createGameObject = function () {
    var i = 0;
    var btn = Math.floor((Math.random() * 4) + 1);
    btn--;
    if (btnArray.length > 0) {
        btnArray = [];
    }
    for (i; i < 100; i++) {
        btnObjct = new Object();

        btnObjct.color = btn++;
        if (btn == 4) {
            btn = 0;
        }
        var clicks = Math.floor((Math.random() * 4) + 1);
        btnObjct.pressCounter = clicks;
        btnObjct.pressCounterUser = clicks;
        btnArray.push(btnObjct);
    }

};
/**change turn fire timer and inc step level*/
user = function () {
    document.getElementById('turn').innerHTML='your turn';
    userStepLevel = stepLevel;
    userTimer();
    stepLevel++;
};
/**timer every sec down*/
userTimer = function () {
    var elTimer = document.getElementById('timerWatch');
     timerIdInterval = setInterval(function () {
        var time = elTimer.textContent;
        time--;
        if (time == 0) {
            clearInterval(timerIdInterval);
            console.log('you lose');
            document.getElementById('turn').innerHTML='you lose';
            stop();
        }
        elTimer.innerHTML = time;
    }, 1000)
};
/**every click user click come her with color parm */
userClick = function (color) {
    /**check color equle , check if for this color still have press*/
    if (btnArray[userStepLevel].color == color && btnArray[userStepLevel].pressCounterUser > 0) {
        btnArray[userStepLevel].pressCounterUser--;
        if (btnArray[userStepLevel].pressCounterUser > 0 && userStepLevel > -1) {
            console.log('good');
        } else if (btnArray[userStepLevel].pressCounterUser == 0 && userStepLevel > -1) {
            console.log('good');
            userStepLevel--;
        }
        if (userStepLevel == -1) {
            clearInterval(timerIdInterval);
            document.getElementById('timerWatch').innerHTML='30';
            console.log('computer turn');
            document.getElementById('turn').innerHTML='simon turn';
            startPressBtn = true;
            start();
        }
    } else {
        document.getElementById('turn').innerHTML='you lose';
        stop();
    }
};
/**stop timer and init all param*/
stop = function(){
    clearInterval(timerIdInterval);
     btnArray = [];
     stepLevel = 0;
     levelCounter = 0;
     startPressBtn = true;
     timerIdInterval = null;
     userStepLevel = 0;
    document.getElementById('timerWatch').innerHTML='30';
    document.getElementById('turn').innerHTML='';
};