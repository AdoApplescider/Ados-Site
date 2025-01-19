////START OF DECLARATIONS////
const root = document.querySelector(':root'); //To select css variables

const sideContent = document.getElementById('sideBar'); //Container for all side content including nav and menu
const tooltips = document.getElementsByClassName("tooltip"); //To select the button tooltips
const buttWraps = document.getElementsByClassName("buttWrap"); //To select the button wrappers

const frameContainer = document.getElementById('frameContainer'); //Iframe container
const iframe = document.getElementById('mainframe'); //Iframe

const mainWave = document.getElementById('mainWave');
const secondWave = document.getElementById('secondWave'); //The two wave decorations

var isMenuOpen = false;

function disableInput() {
    isMenuOpen = false;
    document.body.style.pointerEvents = "none";
}
function enableInput() {
    document.body.style.pointerEvents = "auto";
}
function menu() { //This function should only fire when the side menu is being hovered, therefore assume this.
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen == false) { 
        //Set default hover values to prep for mouseout event. Should probably define a single function for this to avoid having to change all values at once.
        sideContent.style.left = 'calc(-1 * var(--menuWidth))'
        mainWave.style.width = '7rem'
        secondWave.style.width = '8.2rem'
    }
    else {
        //Open full side menu
        sideContent.style.left = '0'
        mainWave.style.width = '29rem'
        secondWave.style.width = '30.2rem'
    }
}
function swapPage(link, color1, color2) { //Swap old page for a new page
    //Outro of current page
    disableInput();
    isMenuOpen = true;
    menu();
    frameContainer.classList.remove('growTransition');
    frameContainer.classList.add('shrinkTransition');

    //Intro to new page (only executes once the animation is finished and the iframe has loaded)
    setTimeout(function() {
        iframe.src = link;

        iframe.onload = function() {
            if (!((color1 == undefined) && (color2 == undefined))) { //If values are given, change the ui color
                root.style.setProperty('--bgColor', color1);
                root.style.setProperty('--secondaryColor', color2);
            }
            frameContainer.classList.remove('shrinkTransition');
            frameContainer.style.clipPath = 'circle(0% at 50% 50%)';
            frameContainer.classList.add('growTransition');
            enableInput();
        };
    }, 1500); //Ensure the timeframe matches the outro anim length
}
////END OF DECLARATIONS////

////START OF INTRO ANIM////
disableInput(); //Set up intro anim
frameContainer.style.clipPath = 'circle(0% at 50% 50%)'
document.querySelectorAll("button").forEach(button => {
    button.style.opacity = '0'
});

window.addEventListener('DOMContentLoaded', function() { //Wait until page is loaded to play intro anim
    frameContainer.classList.add("growTransition");
    document.querySelectorAll("button").forEach((button, index) => {
        setTimeout(function () {
            button.classList.add("bounce");
        }, 150 * index);  //Delay increases with each button
    });
    setTimeout(function() { //Undo intro prep after animation has concluded
        document.querySelectorAll("button").forEach(button => {
            button.style.opacity = '100%'
            button.classList.remove("bounce");
        });
        frameContainer.style.clipPath = ''
        frameContainer.classList.remove("growTransition");
        enableInput();
    }, 1800); //Ensure that this time matches the intro duration
});
////END OF INTRO ANIM////

//LISTENERS//
sideContent.addEventListener("mouseover", function() {
    if (isMenuOpen == false) {
        sideContent.style.left = 'calc(-1 * var(--menuWidth) + 1rem)'
        mainWave.style.width = '8rem'
        secondWave.style.width = '9.2rem'

        Array.from(tooltips).forEach(tooltip => {
            tooltip.style.opacity = "100%";
        });
        Array.from(buttWraps).forEach(buttWrap => {
            buttWrap.classList.add("wobble");
        });
        document.querySelectorAll("button").forEach(button => {
            button.style.borderRadius = "100%";
        });
    }
});
sideContent.addEventListener("mouseout", function() {
    if (isMenuOpen == false) {
        sideContent.style.left = ''
        mainWave.style.width = ''
        secondWave.style.width = ''

        Array.from(tooltips).forEach(tooltip => {
            tooltip.style.opacity = "0%";
        });
        Array.from(buttWraps).forEach(buttWrap => {
            buttWrap.classList.remove("wobble");
        });
        document.querySelectorAll("button").forEach(button => {
            button.style.borderRadius = "";
            button.classList.remove("wobble");
        });
    }
});